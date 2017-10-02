<h1 align="center">
  <br>
  <a href="https://github.com/stoex/mergepdf"><img src="https://raw.githubusercontent.com/stoex/mergePDF/master/src/assets/icon.png" alt="mergepdf-icon" width="200"></a>
  <br>
  <br>
    MergePDF
  <br>
  <br>
</h1>

<h4 align="center">An open-source PDF merging tool</h4>
<h4 align="center">For Windows & Linux</h4>
<h5 align="center">Built with Electron, React, Blueprint and PDFtk</h5>


<p align="center">
  <a href="https://github.com/stoex/mergepdf/releases"><img src="https://img.shields.io/github/release/stoex/mergepdf.svg" alt="Release"></a>
  <a href="https://github.com/stoex/mergepdf/releases"><img src="https://img.shields.io/github/downloads/stoex/mergepdf/total.svg" alt="Downloads"></a>
</p>

### Install

**MergePDF** is still under development. You can download the latest version from the [releases](https://github.com/stoex/mergepdf/releases) page.

Please not that binaries are not signed. If you need them to be signed you can easily do it with your own certificates.

### Features
* PDF merging - select multiple files and change options to produce a new document
* Easy to control
* Easy to use

### How to install
#### Clone
```
git clone https://github.com/stoex/mergepdf
```
#### Install dependencies

```
$ npm install
```

#### Run app

```
$ npm start
```

### Package app

Builds app binaries for OS X, Linux, and Windows.

```bash
$ npm run build
```

To build for one platform:

```bash
$ npm run build -- [platform]
```

Where `[platform]` is `darwin`, `linux`, `win32`, or `all` (default).

The following optional arguments are available:

- `--sign` - Sign the application (OS X, Windows)
- `--package=[type]` - Package single output type.
   - `deb` - Debian package
   - `zip` - Linux zip file
   - `dmg` - OS X disk image
   - `exe` - Windows installer
   - `portable` - Windows portable app
   - `all` - All platforms (default)

Note: Even with the `--package` option, the auto-update files (.nupkg for Windows) will always be produced.

### Code Style

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

### License

MIT License

Copyright (c) 2017 Christian Nicola

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
