import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import {
  Button,
  AnchorButton,
  Collapse,
  Radio,
  RadioGroup
} from "@blueprintjs/core";

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
          <AnchorButton
            iconName={isOpen ? "caret-down" : "caret-up"}
            className={"pt-minimal"}
            onClick={co}
          />
        </div>
      </section>
      <Collapse isOpen={isOpen}>
        <section className={"pt-elevation-0 mergelist"}>
          <div className={"column"}>
            <RadioGroup selectedValue={choice} onChange={hc}>
              <Radio label="Whole" value="whole" />
              <Radio label="Single page" value="single" />
              <Radio label="Page range" value="range" />
            </RadioGroup>
          </div>
        </section>
      </Collapse>
    </div>
  );
});

const SortableList = SortableContainer(({ items, hc, co }) => {
  return (
    <div>
      {items.map((obj, index) =>
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={obj.label}
          isOpen={obj.isOpen}
          choice={obj.choice}
          handleChoice={hc}
          collapeOptions={co}
        />
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
