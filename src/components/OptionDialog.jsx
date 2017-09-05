import React, { Component } from "react";
import {
  Dialog,
  Button,
  Slider,
  RangeSlider,
  Radio,
  RadioGroup,
  Label,
  Intent
} from "@blueprintjs/core";

class OptionDialog extends Component {
  state = { isOpen: true, value: 1, range: [1, 32], option: "whole" };

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  getChangeHandler = number => {
    this.setState({ value: number });
  };

  handleRangeChange = range => {
    this.setState({ range: range });
  };

  handleOptionChange = e => {
    this.setState({ option: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <Dialog
          iconName="wrench"
          isOpen={this.state.isOpen}
          onClose={this.toggleDialog}
          canOutsideClickClose={false}
          title={`${this.props.label} - Options`}
        >
          <div className="pt-dialog-body">
            <RadioGroup
              label="Please select one of the following options:"
              onChange={this.handleOptionChange}
              selectedValue={this.state.option}
            >
              <Radio label="Whole document" value="whole" />
              <Radio label="Single page" value="single" />
              <Radio label="Page range" value="range" />
            </RadioGroup>
            <Slider
              min={1}
              max={32}
              stepSize={1}
              labelStepSize={10}
              showTrackFill={false}
              onChange={this.getChangeHandler}
              value={this.state.value}
              disabled={this.state.option !== "single" ? true : false}
            />
            <RangeSlider
              min={1}
              max={82}
              stepSize={1}
              labelStepSize={10}
              onChange={this.handleRangeChange}
              value={this.state.range}
              disabled={this.state.option !== "range" ? true : false}
            />
          </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="Close" onClick={this.toggleDialog} />
              <Button
                intent={Intent.PRIMARY}
                onClick={this.toggleDialog}
                text="Save"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default OptionDialog;
