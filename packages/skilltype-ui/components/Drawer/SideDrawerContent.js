import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const SideDrawerContent = ({ classes, className, children, style }) => (
  <div
    className={classnames(className, classes.sideDrawerContent)}
    style={style}
  >
    {children}
  </div>
)

export default injectSheet(styles)(SideDrawerContent)
