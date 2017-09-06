import React, { Component } from "react";
import AppMenu from "./AppMenu";
import "normalize.css/normalize.css";
import "@blueprintjs/core/dist/blueprint.css";
import ContentArea from "./ContentArea.jsx";
import { arrayMove } from "react-sortable-hoc";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class App extends Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
      merge: []
    };
  }

  componentDidMount = () => {
    ipcRenderer.on("directory-data", (e, a) => {
      this.receiveState(a[0]);
    });

    ipcRenderer.on("post-pdf-info", (e, a) => {
      let state = [].concat(this.state.merge);
      state.forEach(o => {
        if (a.path === o.path) {
          o.pages = a.pages;
          o.range = [1, a.pages];
          o.id = this.randomID();
          o.choice = "whole";
          o.value = 1;
          o.isOpen = false;
        }
      });
      this.setState({ merge: state });
    });
  };

  componentWillUnmount = () => {
    ipcRenderer.removeListener("directory-data");
    ipcRenderer.removeListener("post-pdf-info");
  };

  randomID = () => {
    const len = 5;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    if (nodeData.hasOwnProperty("option")) {
      const data = Object.assign({}, nodeData);
      ipcRenderer.send("get-pdf-info", data);
      this.state.merge.push(data);
      this.setState(this.state);
    }
  };

  handleNodeCollapse = nodeData => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  handleNodeExpand = nodeData => {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };

  expandAll = () => {
    this.forEachNode(this.state.nodes, n => {
      if (n.hasOwnProperty("hasCaret")) {
        n.isExpanded = true;
      }
      this.setState(this.state);
    });
  };

  collapseAll = () => {
    this.forEachNode(this.state.nodes, n => {
      if (n.hasOwnProperty("hasCaret")) {
        n.isExpanded = false;
      }
      this.setState(this.state);
    });
  };

  showFile = e => {
    this.forEachNode(this.state.nodes, n => {
      n.isSelected = false;
    });
    if (e.target.value !== "") {
      this.forEachNode(this.state.nodes, n => {
        if (n.iconName === "document") {
          return n.label.toUpperCase().includes(e.target.value.toUpperCase())
            ? (n.isSelected = true)
            : null;
        }
      });
    }
    this.setState(this.state);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      merge: arrayMove(this.state.merge, oldIndex, newIndex)
    });
  };

  openFile = path => {
    ipcRenderer.send("open-file", path);
  };

  removeFromMergeList = index => {
    let state = [].concat(this.state.merge);
    state.splice(index, 1);
    this.setState({ merge: state });
  };

  toggleDialog = id => {
    const state = [].concat(this.state.merge);
    state.map(i => {
      return i.id === id ? (i.isOpen = !i.isOpen) : i;
    });
    this.setState({ merge: state });
  };

  pageSelectionHandler = (number, id) => {
    const state = [].concat(this.state.merge);
    state.map(i => {
      return i.id === id ? (i.value = number) : i;
    });
    this.setState({ merge: state });
  };

  pageRangeSelectionHandler = (range, id) => {
    const state = [].concat(this.state.merge);
    state.map(i => {
      return i.id === id ? (i.range = range) : i;
    });
    this.setState({ merge: state });
  };

  optionSelectionHandler = (e, id) => {
    const state = [].concat(this.state.merge);
    state.map(i => {
      return i.id === id ? (i.option = e.currentTarget.value) : i;
    });
    this.setState({ merge: state });
  };

  render() {
    if (this.state.nodes.length !== 0) {
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
    }
    return (
      <div>
        <AppMenu
          openFolder={this.openFolder}
          nodes={this.state.nodes}
          options={this.state.options}
          showFile={this.showFile}
        />
        <ContentArea
          nodes={this.state.nodes}
          merge={this.state.merge}
          handleNodeClick={this.handleNodeClick}
          handleNodeCollapse={this.handleNodeCollapse}
          handleNodeExpand={this.handleNodeExpand}
          collapseAll={this.collapseAll}
          expandAll={this.expandAll}
          onSortEnd={this.onSortEnd}
          handleChoice={this.handleChoice}
          collapseOptions={this.collapseOptions}
          openFile={this.openFile}
          removeFromMergeList={this.removeFromMergeList}
          toggleDialog={this.toggleDialog}
          pageSelectionHandler={this.pageSelectionHandler}
          pageRangeSelectionHandler={this.pageRangeSelectionHandler}
          optionSelectionHandler={this.optionSelectionHandler}
        />
      </div>
    );
  }
}

export default App;
