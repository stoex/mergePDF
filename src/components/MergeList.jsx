import React, { Component } from "react";
import PropTypes from "prop-types";
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
    const options = obj => {
      switch (obj.option) {
        case "whole":
          return `Option: whole document`;
        case "single":
          return `Option: page ${obj.value}`;
        case "range":
          return `Option: pages ${obj.range[0]}-${obj.range[1]}`;
      }
    };
    return (
      <div>
        <section>
          <div className={"mergelist-item"}>
            <DragHandle />
          </div>
          <div className={"column mergelist-item pt-text-overflow-ellipsis"}>
            {obj.label}
          </div>
          <div className={"column mergelist-item pt-text-overflow-ellipsis"}>
            {options(obj)}
          </div>
          <div className={"column pt-button-group pt-minimal"}>
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
              className={
                obj.pages <= 1 ? (
                  "pt-button pt-icon-wrench pt-disabled"
                ) : (
                  "pt-button pt-icon-wrench"
                )
              }
              tabIndex={"0"}
              role={"button"}
            >
              Options
            </a>
            <a
              onClick={i => {
                removeFromMergeList(obj.id);
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
        helperClass={
          this.props.theme === true ? "sortable-light" : "sortable-dark"
        }
      />
    );
  }
}

MergeList.propTypes = {
  merge: PropTypes.any,
  onSortEnd: PropTypes.func.isRequired,
  openFile: PropTypes.func.isRequired,
  removeFromMergeList: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  theme: PropTypes.bool.isRequired
};

export default MergeList;
