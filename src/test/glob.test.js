const glob = require("glob");
const Path = require("path");
const os = require("os").platform();
const hrstart = process.hrtime();

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
  const folderArr = glob.sync(`${src}/**/`);
  const fileArr = glob.sync(`${src}/**/*.pdf`);
  return folderArr.concat(fileArr).unique();
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
    childNodes: []
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
    childNodes: []
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
    label: label
  };

  addToNode(array, parent, obj);
};

const createDataArray = data => {
  let arr = [];
  const basePath = data[0];
  data.forEach((i, idx) => {
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
  const hrend = process.hrtime(hrstart);
  console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
  return arr;
};

const files = listFiles("C:\\Users\\c.nicola\\Downloads");

//const nodeTree = createDataArray(files);

//console.log(JSON.stringify(nodeTree));
console.log(files);
