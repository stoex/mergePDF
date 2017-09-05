var fs = require("fs");
var glob = require("glob");
var pdfjsLib = require("pdfjs-dist");

const listFiles = src => {
  const fileArr = glob.sync(`${src}/**/*.pdf`);
  return fileArr;
};

const countPages = arr => {
  let countPromises = [];
  arr.forEach(i => {
    const data = new Uint8Array(fs.readFileSync(i));
    const promise = pdfjsLib.getDocument(data);
    countPromises.push(promise);
  });

  return Promise.all(countPromises).then(pages => {
    pages.forEach(p => {
      console.log(p.pdfInfo);
    });
  });
};

const files = listFiles("C:\\Users\\c.nicola\\Downloads");
countPages(files);
