import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MenuBar from './MenuBar'
import styles from './styles'

const VerticalMenuBar = ({
  style,
  className,
  classes,
  children,
  ...others
}) => (
  <MenuBar
    className={classnames(className, classes.verticalMenuBar)}
    style={style}
    vertical
    classes={classes}
    {...others}
  >
    {children}
  </MenuBar>
)

export default injectSheet(styles)(VerticalMenuBar)
