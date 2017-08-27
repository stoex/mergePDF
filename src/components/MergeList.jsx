import React, { Component } from "react";
import { render } from "react-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }) =>
  <li>
    {value}
  </li>
);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((obj, index) =>
        <SortableItem key={`item-${index}`} index={index} value={obj.label} />
      )}
    </ul>
  );
});

class MergeList extends Component {
  state = {
    items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"]
  };
  render() {
    return (
      <SortableList items={this.props.merge} onSortEnd={this.props.onSortEnd} />
    );
  }
}
export default MergeList;
