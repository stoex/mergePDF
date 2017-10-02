import React, { Component } from 'react'

import { NonIdealState } from '@blueprintjs/core'

class NoFolderSelection extends Component {
  render () {
    const description = <span>Open a folder to start merging files.</span>
    return (
      <NonIdealState
        visual='folder-close'
        title='No folder selected.'
        description={description}
        className={'foldertree'}
      />
    )
  }
}

export default NoFolderSelection
