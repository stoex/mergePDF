const electron = require("electron");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");
const glob = require("glob");
const Path = require("path");
const fs = require("fs");
const os = require("os").platform();
const PDFJS = require("pdfjs-dist");
const PDFMerge = require("./merge");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require("url");
const { dialog, ipcMain, shell } = electron;

let mainWindow;
let toasterKey;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: Path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here
Array.prototype.unique = function() {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

const listFiles = src => {
  let srcNodes = [];
  src.forEach(item => {
    const folderArr = [
      `${item.match(/\\$/)
        ? item.replace(/\\/g, "/")
        : item.replace(/\\/g, "/") + "/"}`
    ];
    const fileArr = glob.sync(`${item}/**/*.pdf`);
    fileArr.forEach(i => {
      const subFolders = i
        .replace(folderArr[0], "")
        .split("/")
        .splice(0, 1);
      subFolders.forEach((j, idx) => {
        if (!j.match(/pdf$/)) {
          idx === 0
            ? folderArr.push(folderArr[0] + j + "/")
            : folderarr.push(folderArr[-1] + j + "/");
        }
      });
    });
    srcNodes.push(folderArr.concat(fileArr).unique());
  });
  return srcNodes;
};

const addToNode = (currentNode, label, toAdd) => {
  if (currentNode instanceof Array) {
    for (var i = 0; i < currentNode.length; i++) {
      addToNode(currentNode[i], label, toAdd);
    }
  } else {
    for (var prop in currentNode) {
      if (prop == "label") {
        if (currentNode[prop] == label) {
          currentNode.childNodes.push(toAdd);
        }
      }
      if (
        currentNode[prop] instanceof Object ||
        currentNode[prop] instanceof Array
      )
        addToNode(currentNode[prop], label, toAdd);
    }
  }
};

const createRootDir = (path, array) => {
  const label = path.split(Path.sep).slice(-2)[0];
  const obj = {
    hasCaret: true,
    iconName: "folder-close",
    label: label,
    childNodes: [],
    path: path
  };
  array.push(obj);
};

const createChildDir = (path, basepath, array) => {
  const label = path.split(Path.sep).slice(-2)[0];
  const parent = path.split(Path.sep).slice(-3)[0];
  const obj = {
    hasCaret: true,
    iconName: "folder-close",
    label: label,
    childNodes: [],
    path: path
  };
  addToNode(array, parent, obj);
};

const createFile = (path, array) => {
  let label;
  if (os === "win32") {
    label = Path.basename(path).toString();
  } else {
    label = Path.posix.basename(path).toString();
  }
  const parent = path.split(Path.sep).slice(-2)[0];
  const obj = {
    iconName: "document",
    label: label,
    path: path,
    option: "whole"
  };
  addToNode(array, parent, obj);
};

const createDataArray = data => {
  let arr = [];
  data.forEach(item => {
    const basePath = item[0];
    item.forEach((i, idx) => {
      let isDir;
      if (os === "win32") {
        i = i.replace(/\//g, "\\");
        isDir = /\\$/.test(i);
      } else {
        isDir = /\/$/.test(i);
      }
      if (isDir) {
        if (idx === 0) {
          createRootDir(i, arr);
        } else {
          createChildDir(i, basePath, arr);
        }
      } else {
        createFile(i, arr);
      }
    });
  });
  return arr;
};

const openDirectory = () => {
  dialog.showOpenDialog(
    {
      properties: ["openDirectory"]
    },
    dir => {
      {
        if (dir !== undefined) {
          const files = listFiles(dir);
          const data = createDataArray(files);
          mainWindow.webContents.send("directory-data", data);
        }
      }
    }
  );
};

const saveFileDialog = files => {
  dialog.showSaveDialog(
    {
      filters: [
        {
          name: "Adobe PDF",
          extensions: ["pdf"]
        }
      ]
    },
    filename => {
      merge(filename, files);
    }
  );
};

const getPdfInfo = (obj, callback) => {
  const copy = Object.assign({}, obj);
  const raw = new Uint8Array(fs.readFileSync(copy.path));
  const pdf = PDFJS.getDocument(raw);
  return pdf.then(doc => {
    copy.pages = doc.pdfInfo.numPages;
    callback(copy);
  });
};

const merge = (newFile, files) => {
  mainWindow.webContents.send("start-toaster");
  PDFMerge(files, { output: newFile }).then(
    mainWindow.webContents.send("merge-finished", {
      file: newFile,
      toaster: toasterKey
    })
  );
};

const openFile = a => {
  shell.openItem(a);
};

ipcMain.on("open-dialog", (e, a) => {
  openDirectory();
});

ipcMain.on("open-file", (e, a) => {
  openFile(a);
});

ipcMain.on("get-pdf-info", (e, a) => {
  getPdfInfo(a, data => {
    e.sender.send("post-pdf-info", data);
  });
});

ipcMain.on("refresh-nodes", (e, a) => {
  const files = listFiles(a);
  const data = createDataArray(files);
  mainWindow.webContents.send("refresh-done", data);
});

ipcMain.on("merge-files", (e, a) => {
  saveFileDialog(a);
});

ipcMain.on("toaster-info", (e, a) => {
  toasterKey = a;
});
