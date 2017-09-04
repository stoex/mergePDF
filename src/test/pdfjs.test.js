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
    fs.readFile(i, (err, data) => {
      const rawData = new Uint8Array(data);
      countPromises.push(
        pdfjsLib.getDocument(rawData).then(doc => {
          return doc.numPages;
        })
      );
    });
  });

  return Promise.all(countPromises).then(pages => {
    pages.forEach(p => {
      console.log(p);
    });
  });
};

const files = listFiles("C:\\Users\\c.nicola\\Downloads");
countPages(files);
