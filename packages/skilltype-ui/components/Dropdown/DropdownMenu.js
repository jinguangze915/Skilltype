import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const DropdownMenu = ({ classes, className, children, style }) => (
  <ul className={classnames(className, classes.menu)} style={style}>
    {children}
  </ul>
)

export default injectSheet(styles)(DropdownMenu)
