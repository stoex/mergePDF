"use strict";

const fs = require("fs");
const os = require("os");
const tmp = require("tmp");
const child = require("child_process");
const isDev = require("electron-is-dev");
const Promise = require("bluebird");
const PassThrough = require("stream").PassThrough;
const shellescape = require("shell-escape");
const path = require("path");
const execFile = Promise.promisify(child.execFile);
const exec = Promise.promisify(child.exec);
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

const isWindows = os.platform() === "win32";

module.exports = (files, options) =>
  new Promise((resolve, reject) => {
    if (!Array.isArray(files)) {
      reject(
        new TypeError("Expected files to be an array of paths to PDF files.")
      );

      return;
    }

    // files = files.filter(file => typeof file === typeof "");

    if (files.length === 0) {
      reject(new Error("No files were submitted for merging."));

      return;
    }

    if (files.length === 1) {
      reject(
        new Error(
          "You need at least two files in order to merge PDF documents."
        )
      );

      return;
    }

    options = isDev
      ? Object.assign(
          {
            libPath: `${process.env.PATH.match(/pdftk/) !== null
              ? "pdftk"
              : path.join(__dirname, "../libs/pdftk.exe")}`,
            output: Buffer
          },
          options
        )
      : Object.assign(
          {
            libPath: `${process.env.PATH.match(/pdftk/) !== null
              ? "pdftk"
              : path.join(__dirname, "../../../libs/pdftk.exe")}`,
            output: Buffer
          },
          options
        );

    const tmpFilePath = isWindows
      ? tmp.tmpNameSync()
      : shellescape([tmp.tmpNameSync()]);

    const argFiles = files
      .map(file => {
        return isWindows
          ? `${file.id}=${file.path}`
          : `${file.id}=${shellescape([file.replace(/\\/g, "/")])}`;
      })
      .concat(["cat"]);

    const argOptions = files
      .map(file => {
        switch (file.option) {
          case "single":
            return `${file.id}${file.value}`;
          case "range":
            return `${file.id}${file.range[0]}-${file.range[1]}`;
          default:
            return `${file.id}`;
        }
      })
      .concat(["output", tmpFilePath]);

    const args = argFiles.concat(argOptions);

    const childPromise =
      isWindows && options.libPath !== "pdftk"
        ? execFile(options.libPath, args)
        : exec(`${options.libPath} ${args.join(" ")}`);

    childPromise
      .then(() => readFile(tmpFilePath))
      .then(
        buffer =>
          new Promise(resolve => {
            fs.unlink(tmpFilePath, () => resolve(buffer));
          })
      )
      .then(buffer => {
        if (
          options.output === Buffer ||
          String(options.output).toUpperCase() === "BUFFER"
        ) {
          return buffer;
        }

        if (
          options.output === PassThrough ||
          ["STREAM", "READSTREAM"].indexOf(
            String(options.output).toUpperCase()
          ) !== -1
        ) {
          const stream = new PassThrough();

          stream.end(buffer);

          return stream;
        }

        return writeFile(options.output, buffer).then(() => buffer);
      })
      .then(resolve)
      .catch(reject);
  });
