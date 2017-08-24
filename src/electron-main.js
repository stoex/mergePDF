const electron = require("electron");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");
const glob = require("glob");
const Path = require("path");
const fs = require("fs");
const os = require("os").platform();
const pdf = require("pdfjs-dist");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require("url");
const { dialog, ipcMain } = electron;
var mainWindow;

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
// code. You can also put them in separate files and require them here.
const randomID = () => {
  let len = 5;
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let i;
  let seq = "";

  const randomInt = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  };

  const randomChar = str => {
    return str.charAt(randomInt(0, str.length - 1));
  };
  for (i = 1; i <= len; i++) {
    seq += randomChar(letters);
  }
  return seq;
};

const createDataArray = data => {
  let arr = [];
  let file;
  data.map(i => {
    if (os === "win32") {
      i = i.replace(/\//g, "\\");
      file = Path.basename(i);
    } else {
      file = Path.posix.basename(i);
    }
    const folder = Path.dirname(i);
    const split = folder.split(Path.sep);
    const folderTitle = split.slice(-1)[0];
    const folderObject = {
      folderPath: folder,
      folderTitle: folderTitle,
      files: []
    };
    const fileObj = {
      ID: randomID(),
      fileTitle: file,
      path: i,
      hidden: false
    };
    const idxFolder = arr.map(o => o.folderPath).indexOf(folder);
    switch (idxFolder) {
      case -1:
        arr.push(folderObject);
        arr[arr.length - 1].files.push(fileObj);
        break;
      default:
        arr[idxFolder].files.push(fileObj);
        break;
    }
  });
  return arr;
};

const listFiles = (src, cb) => {
  glob(src + "/**/*.pdf", cb);
};

const openDirectory = () => {
  dialog.showOpenDialog(
    {
      properties: ["openDirectory"]
    },
    dir => {
      listFiles(dir, (err, res) => {
        if (err) {
          dialog.showErrorBox(`An error occured.`, `${err}`);
        } else {
          data = createDataArray(res);
          mainWindow.webContents.send("directory-data", data);
        }
      });
    }
  );
};

ipcMain.on("open-dialog", (e, a) => {
  openDirectory();
});
