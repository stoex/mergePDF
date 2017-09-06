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
              toggleDialog={this.props.toggleDialog}
              className="SortableList"
            />
            {this.props.merge.map(o => {
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
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default ContentArea;
