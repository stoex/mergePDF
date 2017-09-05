import React, { Component } from "react";
import FolderTree from "./FolderTree";
import MergeList from "./MergeList";
import OptionDialog from "./OptionDialog";
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
              openFile={this.props.openFile}
              removeFromMergeList={this.props.removeFromMergeList}
              className="SortableList"
            />
            <OptionDialog />
          </div>
        </section>
      </div>
    );
  }
}

export default ContentArea;
