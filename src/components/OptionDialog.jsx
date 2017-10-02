import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  Button,
  Slider,
  RangeSlider,
  Radio,
  RadioGroup,
  Intent
} from '@blueprintjs/core'

class OptionDialog extends Component {
  render () {
    if (this.props.pages === 1) {
      return (
        <div>
          <Dialog
            iconName='wrench'
            isOpen={this.props.isOpen}
            onClose={this.props.toggleDialog}
            canOutsideClickClose={false}
            isCloseButtonShown={false}
            title={`${this.props.label} - Options`}
          >
            <div className='pt-dialog-body'>
              This document has only one page.
            </div>
            <div className='pt-dialog-footer'>
              <div className='pt-dialog-footer-actions'>
                <Button
                  text='Close'
                  onClick={i => {
                    this.props.toggleDialog(this.props.id)
                  }}
                />
              </div>
            </div>
          </Dialog>
        </div>
      )
    } else {
      return (
        <div>
          <Dialog
            iconName='wrench'
            isOpen={this.props.isOpen}
            onClose={this.props.toggleDialog}
            canOutsideClickClose={false}
            isCloseButtonShown={false}
            title={`${this.props.label} - Options`}
          >
            <div className='pt-dialog-body'>
              <RadioGroup
                label='Please select one of the following options:'
                onChange={i => {
                  this.props.optionSelectionHandler(i, this.props.id)
                }}
                selectedValue={this.props.option}
              >
                <Radio label='Whole document' value='whole' />
                <Radio label='Single page' value='single' />
                <Radio label='Page range' value='range' />
              </RadioGroup>
              <Slider
                min={1}
                max={this.props.pages}
                stepSize={1}
                labelStepSize={10}
                showTrackFill={false}
                onChange={i => {
                  this.props.pageSelectionHandler(i, this.props.id)
                }}
                value={this.props.value}
                disabled={this.props.option !== 'single'}
              />
              <RangeSlider
                min={1}
                max={this.props.pages}
                stepSize={1}
                labelStepSize={10}
                onChange={i => {
                  this.props.pageRangeSelectionHandler(i, this.props.id)
                }}
                value={this.props.range}
                disabled={this.props.option !== 'range'}
              />
            </div>
            <div className='pt-dialog-footer'>
              <div className='pt-dialog-footer-actions'>
                <Button
                  intent={Intent.PRIMARY}
                  onClick={i => {
                    this.props.toggleDialog(this.props.id)
                  }}
                  text='Save'
                />
              </div>
            </div>
          </Dialog>
        </div>
      )
    }
  }
}

OptionDialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  pageRangeSelectionHandler: PropTypes.func.isRequired,
  pageSelectionHandler: PropTypes.func.isRequired,
  optionSelectionHandler: PropTypes.func.isRequired
}

export default OptionDialog
