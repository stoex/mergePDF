import React, { Component } from "react";
import { Classes, Tooltip, Tree } from "@blueprintjs/core";
import NoFolderSelection from "./NoFolderSelection";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class FolderTree extends Component {
  constructor() {
    super();
    this.state = {
      nodes: []
    };
    const refreshLabel = (
      <Tooltip content="Refresh folder">
        <span className="pt-icon-standard pt-icon-refresh" />
      </Tooltip>
    );
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount = () => {
    ipcRenderer.on("directory-data", (e, a) => {
      console.log("received data");
      this.receiveState(a[0]);
    });
  };

  componentWillUnmount = () => {
    ipcRenderer.removeListener("directory-data", (e, a) => {
      this.receiveState(a[0]);
    });
  };

  receiveState = data => {
    let state = [].concat(this.state.nodes);
    state.push(data);
    this.setState({ nodes: state });
  };

  forEachNode = (nodes, callback) => {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  };

  handleNodeClick = (nodeData, _nodePath, e) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, n => (n.isSelected = false));
    }
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;
    this.setState(this.state);
  };

  handleNodeCollapse = nodeData => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  handleNodeExpand = nodeData => {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };

  randomID = () => {
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

  render() {
    if (this.state.nodes.length === 0) {
      return <NoFolderSelection />;
    } else {
      let i = 0;
      this.forEachNode(this.state.nodes, n => {
        n.id = i++;
        if (n.hasOwnProperty("childNodes")) {
          return n.childNodes.length === 0
            ? n.childNodes.push({
                iconName: "warning-sign",
                label: "This folder is empty."
              })
            : null;
        }
      });
      this.state.nodes.map(i => {
        return (i.secondaryLabel = this.refreshLabel);
      });
      return (
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
          className={Classes.ELEVATION_0}
        />
      );
    }
  }
}

export default FolderTree;
