import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const MenuItemIcon = ({ children, classes, className, style }) =>
  React.cloneElement(React.Children.only(children), {
    classes,
    className: classnames(className, classes.menuItemIcon),
    style,
  })

export default injectSheet(styles)(MenuItemIcon)
