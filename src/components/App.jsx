import React, { Component } from "react";
import AppMenu from "./AppMenu";
import "normalize.css/normalize.css";
import "flexboxgrid/css/flexboxgrid.min.css";
import "@blueprintjs/core/dist/blueprint.css";
import "../css/main.css";
import ContentArea from "./ContentArea.jsx";
import { arrayMove } from "react-sortable-hoc";
import { Toaster, Position, Intent } from "@blueprintjs/core";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class App extends Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
      merge: [],
      theme: true
    };
  }

  toaster;

  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  componentDidMount = () => {
    ipcRenderer.on("directory-data", (e, a) => {
      this.addNewDir(a);
    });

    ipcRenderer.on("post-pdf-info", (e, a) => {
      let state = [].concat(this.state.merge);
      state.forEach(o => {
        if (a.path === o.path) {
          o.pages = a.pages;
          o.range = [1, a.pages];
          o.id = this.randomID();
          o.value = 1;
          o.isOpen = false;
        }
      });
      this.setState({ merge: state });
    });

    ipcRenderer.on("refresh-done", (e, a) => {
      this.refreshDir(a);
    });

    ipcRenderer.on("merge-finished", (e, a) => {
      this.setState({ isMerging: false });
      console.log(`${a} successfully saved`);
      const toast = {
        iconName: "tick",
        message: `${a} successfully saved!`,
        intent: Intent.SUCCESS,
        timeout: 2000
      };
      this.toaster.show(toast);
    });
  };

  componentWillUnmount = () => {
    ipcRenderer.removeListener("directory-data");
    ipcRenderer.removeListener("post-pdf-info");
    ipcRenderer.removeListener("refresh-done");
    ipcRenderer.removeListener("merge-finished");
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

  addNewDir = data => {
    let state = [].concat(this.state.nodes);
    data.forEach(i => {
      state.push(i);
    });
    this.setState({ nodes: state });
  };

  refreshDir = data => {
    let arr = [];
    this.forEachNode(data, i => {
      if (i.hasOwnProperty("iconName") && i.iconName === "document") {
        arr.push(i.path);
      }
    });
    let mstate = [].concat(this.state.merge);
    mstate = mstate.filter(i => {
      if (arr.indexOf(i.path) !== -1) {
        return i;
      } else {
        const toast = {
          iconName: "remove",
          message: `"${i.label}" removed. File no longer exists.`,
          intent: Intent.DANGER,
          timeout: 2000
        };
        this.toaster.show(toast);
      }
    });
    this.setState({ nodes: data, merge: mstate });
  };

  forEachNode = (nodes, callback) => {
    if (nodes == null) {
      return;
    }

    nodes.forEach((node, i, array) => {
      callback(node, i, array);
      this.forEachNode(node.childNodes, callback);
    });
  };

  handleNodeClick = (nodeData, _nodePath, e) => {
    if (nodeData.hasOwnProperty("option")) {
      const data = Object.assign({}, nodeData);
      this.addToast(data);
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
      this.forEachNode(this.state.nodes, (n, idx) => {
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

  removeFromMergeList = id => {
    let state = [].concat(this.state.merge);
    const index = state.findIndex(x => x.id === id);
    this.toaster.show({
      iconName: "remove",
      intent: Intent.PRIMARY,
      message: `Removed "${state[index].label}"`,
      timeout: 2000
    });
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

  addToast = obj => {
    const toast = {
      iconName: "tick",
      message: `"${obj.label}" added!`,
      intent: Intent.SUCCESS,
      timeout: 2000,
      action: {
        onClick: () => {
          this.removeFromMergeList(obj.id);
        },
        text: "Undo"
      }
    };
    this.toaster.show(toast);
  };

  toggleTheme = () => {
    document.body.classList.toggle("pt-dark", this.state.theme);
    this.setState({ theme: !this.state.theme });
  };

  refreshCurrentNodes = () => {
    const paths = this.state.nodes.map(i => {
      return i.path;
    });
    console.log(paths);
    ipcRenderer.send("refresh-nodes", paths);
  };

  mergeFiles = () => {
    this.setState({ isMerging: true });
    ipcRenderer.send("merge-files", this.state.merge);
  };

  render() {
    if (this.state.nodes.length !== 0) {
      let i = 0;
      this.forEachNode(this.state.nodes, (n, index, arr) => {
        n.id = i++;
      });
    }

    return (
      <div className={this.state.theme === false ? "pt-dark" : "pt-light"}>
        <AppMenu
          openFolder={this.openFolder}
          nodes={this.state.nodes}
          options={this.state.options}
          showFile={this.showFile}
          toggleTheme={this.toggleTheme}
          refreshCurrentNodes={this.refreshCurrentNodes}
          mergeFiles={this.mergeFiles}
          theme={this.state.theme}
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
          theme={this.state.theme}
        />
        <Toaster position={Position.BOTTOM} ref={this.refHandlers.toaster} />
      </div>
    );
  }
}

export default App;
