import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <span
    className={"pt-icon-standard pt-icon-drag-handle-horizontal drag-handle"}
  />
));

const SortableItem = SortableElement(
  ({ obj, openFile, removeFromMergeList, sortIndex, toggleDialog }) => {
    return (
      <div>
        <section className={"pt-elevation-0 mergelist"}>
          <div className={"column mergelist-item"}>
            <DragHandle />
          </div>
          <div className={"column mergelist-item"}>{obj.label}</div>
          <div className={"column pt-button-group pt-minimal button-group"}>
            <a
              onClick={i => {
                openFile(obj.path);
              }}
              className={"pt-button pt-icon-document-open"}
              tabIndex={"0"}
              role={"button"}
            >
              Preview
            </a>
            <a
              onClick={i => {
                toggleDialog(obj.id);
              }}
              className={"pt-button pt-icon-wrench"}
              tabIndex={"0"}
              role={"button"}
            >
              Options
            </a>
            <a
              onClick={i => {
                removeFromMergeList(sortIndex);
              }}
              className={"pt-button pt-icon-small-cross"}
              tabIndex={"0"}
              role={"button"}
            >
              Remove
            </a>
          </div>
        </section>
      </div>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, openFile, removeFromMergeList, toggleDialog }) => {
    return (
      <div>
        {items.map((obj, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            sortIndex={index}
            obj={obj}
            openFile={openFile}
            removeFromMergeList={removeFromMergeList}
            toggleDialog={toggleDialog}
          />
        ))}
      </div>
    );
  }
);

class MergeList extends Component {
  render() {
    return (
      <SortableList
        items={this.props.merge}
        onSortEnd={this.props.onSortEnd}
        useDragHandle={true}
        lockAxis={"y"}
        openFile={this.props.openFile}
        removeFromMergeList={this.props.removeFromMergeList}
        toggleDialog={this.props.toggleDialog}
        helperClass="SortableHelper"
      />
    );
  }
}

export default MergeList;
