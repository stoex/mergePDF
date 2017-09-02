import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { Button } from "@blueprintjs/core";

const DragHandle = SortableHandle(() =>
  <span className={"pt-icon-standard pt-icon-drag-handle-horizontal"} />
);

const SortableItem = SortableElement(({ value, hc, co, isOpen, choice }) => {
  return (
    <div>
      <section className={"pt-elevation-0 mergelist"}>
        <div className={"column mergelist-item"}>
          <DragHandle />
        </div>
        <div className={"column mergelist-item"}>
          {value}
        </div>
        <div className={"column listicons"}>
          <Button iconName="document-open" className={"pt-minimal"} />
          <Button iconName="trash" className={"pt-minimal"} />
        </div>
      </section>
    </div>
  );
});

const SortableList = SortableContainer(({ items, hc, co }) => {
  return (
    <div>
      {items.map((obj, index) =>
        <SortableItem key={`item-${index}`} index={index} value={obj.label} />
      )}
    </div>
  );
});

class MergeList extends Component {
  render() {
    return (
      <SortableList
        items={this.props.merge}
        onSortEnd={this.props.onSortEnd}
        useDragHandle={true}
        lockAxis={"y"}
        hc={this.props.handleChoice}
        co={this.props.collapseOptions}
      />
    );
  }
}

export default MergeList;
