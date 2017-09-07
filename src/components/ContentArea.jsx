import React, { Component } from "react";
import FolderTree from "./FolderTree";
import MergeList from "./MergeList";
import OptionDialog from "./OptionDialog";
import NoFolderSelection from "./NoFolderSelection";

class ContentArea extends Component {
  render() {
    if (this.props.nodes.length === 0) {
      return (
        <div className={"list"}>
          <NoFolderSelection />
        </div>
      );
    } else {
      return (
        <div className={"row content"}>
          <div className={"col-xs-12 col-lg-4"}>
            <FolderTree
              nodes={this.props.nodes}
              handleNodeClick={this.props.handleNodeClick}
              handleNodeCollapse={this.props.handleNodeCollapse}
              handleNodeExpand={this.props.handleNodeExpand}
              expandAll={this.props.expandAll}
              collapseAll={this.props.collapseAll}
            />
          </div>
          <div className={"col-xs-12 col-lg-8 list"}>
            <MergeList
              merge={this.props.merge}
              onSortEnd={this.props.onSortEnd}
              openFile={this.props.openFile}
              removeFromMergeList={this.props.removeFromMergeList}
              toggleDialog={this.props.toggleDialog}
              className="SortableList"
              theme={this.props.theme}
            />
            {this.props.merge.map(o => {
              if (o.pages > 1) {
                return (
                  <OptionDialog
                    key={o.id}
                    id={o.id}
                    isOpen={o.isOpen}
                    toggleDialog={this.props.toggleDialog}
                    label={o.label}
                    pageSelectionHandler={this.props.pageSelectionHandler}
                    pageRangeSelectionHandler={
                      this.props.pageRangeSelectionHandler
                    }
                    optionSelectionHandler={this.props.optionSelectionHandler}
                    option={o.option}
                    value={o.value}
                    range={o.range}
                    pages={o.pages}
                  />
                );
              }
            })}
          </div>
        </div>
      );
    }
  }
}

export default ContentArea;
