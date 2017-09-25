import React, { Component } from "react";
import PropTypes from "prop-types";
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
              } else {
                return null;
              }
            })}
          </div>
        </div>
      );
    }
  }
}

ContentArea.propTypes = {
  nodes: PropTypes.any,
  merge: PropTypes.any,
  handleNodeClick: PropTypes.func.isRequired,
  handleNodeCollapse: PropTypes.func.isRequired,
  handleNodeExpand: PropTypes.func.isRequired,
  collapseAll: PropTypes.func.isRequired,
  expandAll: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  openFile: PropTypes.func.isRequired,
  removeFromMergeList: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  pageSelectionHandler: PropTypes.func.isRequired,
  pageRangeSelectionHandler: PropTypes.func.isRequired,
  optionSelectionHandler: PropTypes.func.isRequired,
  theme: PropTypes.bool.isRequired
};

export default ContentArea;
