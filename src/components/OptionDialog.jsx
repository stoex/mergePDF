import React, { Component } from "react";
import {
  Dialog,
  Button,
  Slider,
  RangeSlider,
  Radio,
  Label,
  Intent
} from "@blueprintjs/core";

class OptionDialog extends Component {
  state = { isOpen: true, value: 1, range: [1, 32] };

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  getChangeHandler = number => {
    this.setState({ value: number });
  };

  handleRangeChange = range => {
    this.setState({ range: range });
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
            <Slider
              min={1}
              max={32}
              stepSize={1}
              labelStepSize={10}
              onChange={this.getChangeHandler}
              value={this.state.value}
            />
            <RangeSlider
              min={1}
              max={82}
              stepSize={1}
              labelStepSize={10}
              onChange={this.handleRangeChange}
              value={this.state.range}
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
