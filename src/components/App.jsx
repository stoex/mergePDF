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
    if (nodeData.hasOwnProperty("pages")) {
      this.state.merge.push(nodeData);
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
      n.hasOwnProperty("hasCaret") ? (n.isExpanded = true) : null;
      this.setState(this.state);
    });
  };

  collapseAll = () => {
    this.forEachNode(this.state.nodes, n => {
      n.hasOwnProperty("hasCaret") ? (n.isExpanded = false) : null;
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
          n.label.toUpperCase().includes(e.target.value.toUpperCase())
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
        />
      </div>
    );
  }
}

export default App;
