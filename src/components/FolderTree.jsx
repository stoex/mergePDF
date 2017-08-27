import React, { Component } from "react";
import { Classes, Tree } from "@blueprintjs/core";
import NoFolderSelection from "./NoFolderSelection";
class FolderTree extends Component {
  render() {
    if (this.props.nodes.length === 0) {
      return <NoFolderSelection />;
    } else {
      return (
        <div>
          <div className={"pt-button-group pt-minimal treebuttons"}>
            <a
              className={"pt-button pt-icon-expand-all"}
              tabIndex={"0"}
              role={"button"}
              onClick={this.props.expandAll}
            >
              Expand all
            </a>
            <a
              className={"pt-button pt-icon-collapse-all"}
              tabIndex={"0"}
              role={"button"}
              onClick={this.props.collapseAll}
            >
              Collapse all
            </a>
          </div>
          <Tree
            contents={this.props.nodes}
            onNodeClick={this.props.handleNodeClick}
            onDoubleClick={this.props.handleNodeDoubleClick}
            onNodeCollapse={this.props.handleNodeCollapse}
            onNodeExpand={this.props.handleNodeExpand}
            className={Classes.ELEVATION_0}
          />
        </div>
      );
    }
  }
}

export default FolderTree;
