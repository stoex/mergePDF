import React, { Component } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Menu, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/labs";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class SearchBox extends Component {
  state = {
    closeOnSelect: true,
    minimal: true,
    openOnKeyDown: false,
    disabled: false,
    filterable: true,
    resetOnClose: false,
    resetOnSelect: false,
    items: []
  };

  componentWillReceiveProps(props) {
    let arr = [];
    this.collectFiles(props, arr);
    this.setState({ items: arr });
  }

  collectFiles = (node, arr) => {
    if (node instanceof Array) {
      for (let i = 0; i < node.length; i++) {
        this.collectFiles(node[i], arr);
      }
    } else {
      for (const prop in node) {
        if (prop === "iconName") {
          if (node[prop] == "document") {
            arr.push(node);
          }
        }
        if (node[prop] instanceof Object || node[prop] instanceof Array)
          this.collectFiles(node[prop], arr);
      }
    }
  };

  render() {
    const { selection, minimal, ...flags } = this.state;
    return (
      <Suggest
        {...flags}
        inputValueRenderer={this.renderInputValue}
        items={this.state.items}
        itemPredicate={this.filterData}
        itemRenderer={this.renderData}
        noResults={<MenuItem disabled text="No results." />}
        onItemSelect={this.props.handleClick}
        popoverProps={{
          popoverClassName: this.state.minimal
            ? "pt-minimal pt-select-popover"
            : "pt-select-popover"
        }}
      />
    );
  }

  renderInputValue = data => {
    return "";
  };

  renderData = ({ handleClick, isActive, item }) => {
    const classes = classNames({
      [Classes.ACTIVE]: isActive,
      [Classes.INTENT_PRIMARY]: isActive
    });
    return (
      <MenuItem
        className={classes}
        key={item.id}
        onClick={i => handleClick(item)}
        text={item.label}
      />
    );
  };

  filterData(query, item, index) {
    return (
      `${index + 1}. ${item.label.toLowerCase()}`.indexOf(
        query.toLowerCase()
      ) >= 0
    );
  }
}
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
              className={
                this.props.nodes.length === 0 ? (
                  "pt-button pt-minimal pt-icon-refresh pt-disabled"
                ) : (
                  "pt-button pt-minimal pt-icon-refresh"
                )
              }
              onClick={i => {
                this.props.refreshCurrentNodes();
              }}
            >
              {"Refresh Folder"}
            </button>
          </div>
          <div className={"pt-navbar-group pt-align-right"}>
            <button
              className={
                this.props.merge.length < 2 ? (
                  "pt-button pt-minimal pt-icon-merge-columns pt-disabled"
                ) : (
                  "pt-button pt-minimal pt-icon-merge-columns"
                )
              }
              onClick={i => {
                this.props.mergeFiles();
              }}
            >
              {"Merge List"}
            </button>
            <span className={"pt-navbar-divider"} />
            <span className={"pt-icon pt-icon-search search"} />
            <SearchBox
              nodes={this.props.nodes}
              handleClick={this.props.handleNodeClick}
            />
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

AppMenu.propTypes = {
  showFile: PropTypes.func.isRequired,
  theme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  mergeFiles: PropTypes.func.isRequired,
  refreshCurrentNodes: PropTypes.func.isRequired,
  merge: PropTypes.array,
  nodes: PropTypes.array
};

DropDownMenu.propTypes = {
  theme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired
};

export default AppMenu;
