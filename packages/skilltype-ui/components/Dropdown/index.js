import React from 'react'
import injectSheet from 'react-jss'
import classnames from 'classnames'

import DropdownToggle from './DropdownToggle'
import DropdownMenu from './DropdownMenu'
import DropdownItem from './DropdownItem'

import styles from './styles'

const Dropdown = ({ id, classes, className, children, style }) => (
  <div
    id={id}
    className={classnames(className, classes.container)}
    style={style}
  >
    {children}
  </div>
)

Dropdown.Toggle = DropdownToggle
Dropdown.Menu = DropdownMenu
Dropdown.Item = DropdownItem

export default injectSheet(styles)(Dropdown)
