import React, { Component } from "react";
import {
  Button,
  AnchorButton,
  Collapse,
  Radio,
  RadioGroup
} from "@blueprintjs/core";
//import "normalize.css/normalize.css";
//import "@blueprintjs/core/dist/blueprint.css";

class FileCard extends Component {
  state = {
    isOpen: false,
    choice: "whole",
    mergeStart: "",
    mergeEnd: ""
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleChoice = e => {
    this.setState({ choice: e.currentTarget.value });
  };

  render() {
    return (
      <div className={"pt-card pt-elevation-0"}>
        <h5>Filename.pdf</h5>
        <div>
          <Button iconName="document-open" />
          <Button iconName="trash" />
          <AnchorButton
            iconName={this.state.isOpen ? "caret-down" : "caret-up"}
            onClick={this.handleClick}
          />
          <Collapse isOpen={this.state.isOpen}>
            <RadioGroup
              onChange={this.handleChoice}
              selectedValue={this.state.choice}
            >
              <Radio label="Whole" value="whole" />
              <Radio label="Single page" value="single" />
              <Radio label="Page range" value="range" />
            </RadioGroup>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default FileCard;
