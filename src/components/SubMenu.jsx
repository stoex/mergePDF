import React, { Component } from 'react'
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core'

class SubMenu extends Component {
  render () {
    return (
      <Menu>
        <MenuItem
          iconName='new-text-box'
          onClick={this.handleClick}
          text='New text box'
        />
        <MenuItem
          iconName='new-object'
          onClick={this.handleClick}
          text='New object'
        />
        <MenuItem
          iconName='new-link'
          onClick={this.handleClick}
          text='New link'
        />
        <MenuDivider />
        <MenuItem text='Settings...' iconName='cog' />
      </Menu>
    )
  }

  handleClick (e) {
    console.log('clicked', e.target.textContent)
  }
}

export default SubMenu
