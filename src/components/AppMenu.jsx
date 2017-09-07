import React, { Component } from "react";
import {
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position
} from "@blueprintjs/core";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class DropDownMenu extends Component {
  render() {
    const menu = (
      <Menu>
        <MenuItem
          iconName="segmented-control"
          text={
            this.props.theme === true ? (
              "Switch to dark theme"
            ) : (
              "Switch to light theme"
            )
          }
          onClick={i => {
            this.props.toggleTheme();
          }}
        />
        <MenuItem iconName="help" text="Help" />
        <MenuItem iconName="translate" text="Switch language">
          <MenuItem iconName="flag" text="German" />
          <MenuItem iconName="flag" text="English" />
        </MenuItem>
      </Menu>
    );
    return (
      <Popover content={menu} position={Position.BOTTOM}>
        <button className={"pt-button pt-minimal pt-icon-cog"} type="button" />
      </Popover>
    );
  }
}
class AppMenu extends Component {
  openFolder = () => {
    ipcRenderer.send("open-dialog");
  };

  handleKeyPress = e => {
    return e.key === "Enter" ? console.log("enter pressed") : null;
  };

  render() {
    return (
      <nav className={"pt-navbar pt-fixed-top"}>
        <div className={"navbar"}>
          <div className={"pt-navbar-group pt-align-left"}>
            <button
              className={"pt-button pt-minimal pt-icon-import"}
              onClick={this.openFolder}
            >
              {"Choose Folder"}
            </button>
            <span className={"pt-navbar-divider"} />
            <button
              className={"pt-button pt-minimal pt-icon-refresh"}
              onClick={console.log("clicked refresh")}
            >
              {"Refresh Folder"}
            </button>
          </div>
          <div className={"pt-navbar-group pt-align-right"}>
            <button
              className={"pt-button pt-minimal pt-icon-merge-columns"}
              onClick={console.log("clicked merge")}
            >
              {"Merge List"}
            </button>
            <span className={"pt-navbar-divider"} />
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
            <DropDownMenu
              toggleTheme={this.props.toggleTheme}
              theme={this.props.theme}
            />
          </div>
        </div>
      </nav>
    );
  }
}

export default AppMenu;
