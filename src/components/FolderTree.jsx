import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tree } from '@blueprintjs/core'
class FolderTree extends Component {
  render () {
    return (
      <div>
        <div className={'pt-button-group pt-minimal treebuttons'}>
          <a
            className={'pt-button pt-icon-expand-all'}
            tabIndex={'0'}
            role={'button'}
            onClick={this.props.expandAll}
          >
            Expand all
          </a>
          <a
            className={'pt-button pt-icon-collapse-all'}
            tabIndex={'0'}
            role={'button'}
            onClick={this.props.collapseAll}
          >
            Collapse all
          </a>
        </div>
        <Tree
          contents={this.props.nodes}
          onNodeClick={this.props.handleNodeClick}
          onDoubleClick={this.props.handleNodeDoubleClick}
          onNodeCollapse={this.props.handleNodeCollapse}
          onNodeExpand={this.props.handleNodeExpand}
          className={'pt-elevation-0'}
        />
      </div>
    )
  }
}

FolderTree.propTypes = {
  nodes: PropTypes.any,
  handleNodeClick: PropTypes.func.isRequired,
  handleNodeCollapse: PropTypes.func.isRequired,
  handleNodeExpand: PropTypes.func.isRequired,
  expandAll: PropTypes.func.isRequired,
  collapseAll: PropTypes.func.isRequired
}

export default FolderTree
