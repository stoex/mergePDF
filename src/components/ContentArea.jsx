import React, { Component } from "react";
import FolderTree from "./FolderTree";
import FileCard from "./FileCard";
import MergeList from "./MergeList";
import "../css/flex.css";

class ContentArea extends Component {
  render() {
    return (
      <div>
        <section>
          <div className={"column"}>
            <FolderTree
              nodes={this.props.nodes}
              handleNodeClick={this.props.handleNodeClick}
              handleNodeCollapse={this.props.handleNodeCollapse}
              handleNodeExpand={this.props.handleNodeExpand}
              expandAll={this.props.expandAll}
              collapseAll={this.props.collapseAll}
            />
          </div>
        </section>
        <hr />
        <section>
          <div className={"column"}>
            <MergeList
              merge={this.props.merge}
              onSortEnd={this.props.onSortEnd}
              collapseOptions={this.props.collapseOptions}
              handleChoice={this.props.handleChoice}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default ContentArea;
