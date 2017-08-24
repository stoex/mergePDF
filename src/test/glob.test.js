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
  const hrend = process.hrtime(hrstart);
  console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
  return folderArr.concat(fileArr).unique();
};

const createRootDir = (path, array) => {
  const label = path.split(Path.sep).slice(-1)[0];
  const obj = {
    hasCaret: true,
    iconName: "folder-close",
    label: label,
    childNodes: []
  };
  array.push(obj);
};

const createChildDir = (path, basepath, array) => {
  const childDir = path.replace(`${basepath}\\`, "");
  const split = childDir.split(Path.sep);
  const label = split.pop();

  const obj = {
    hasCaret: true,
    iconName: "folder-close",
    label: label,
    childNodes: []
  };

  if (split.length === 0) {
    array[0].childNodes.push(obj);
  } else {
  }
};

const createFile = (path, position, array) => {
  let label;
  if (os === "win32") {
    label = Path.basename(path);
  } else {
    label = Path.posix.basename(path);
  }

  const obj = {
    iconName: "document",
    label: label
  };

  return array[position].childNodes.push(obj);
};

const createDataArray = data => {
  let arr = [];
  const basePath = data[0];
  data.map((i, idx) => {
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
    }
  });
};

console.log(listFiles("C:\\Users\\c.nicola\\Downloads"));
