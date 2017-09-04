import React, { Component } from "react";
import { Dialog, Button } from "@blueprintjs/core";

class OptionDialog extends Component {
  render() {
    return (
      <div>
        <Dialog
          iconName="inbox"
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          title="Dialog header"
        >
          <div className="pt-dialog-body">Some content</div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="Secondary" />
              <Button
                intent={Intent.PRIMARY}
                onClick={this.toggleDialog}
                text="Primary"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
