import React, { Component } from "react";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
class AppMenu extends Component {
  openFolder = () => {
    ipcRenderer.send("open-dialog");
  };

  handleKeyPress = e => {
    return e.key === "Enter" ? console.log("enter pressed") : null;
  };

  render() {
    return (
      <nav className={"pt-navbar pt-dark"}>
        <div className={"navbar"}>
          <div className={"pt-navbar-group pt-align-left"}>
            <button
              className={"pt-button pt-minimal pt-icon-import"}
              onClick={this.openFolder}
            >
              {"Choose Folder"}
            </button>
          </div>
          <div className={"pt-navbar-group pt-align-right"}>
            <div className={"pt-input-group default"}>
              <span className={"pt-icon pt-icon-search"} />
              <input
                className={"pt-input"}
                type={"search"}
                placeholder={"Search input"}
                dir={"auto"}
                onChange={this.props.showFile}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <span className={"pt-navbar-divider"} />
            <button className={"pt-button pt-minimal pt-icon-cog"} />
          </div>
        </div>
      </nav>
    );
  }
}

export default AppMenu;
