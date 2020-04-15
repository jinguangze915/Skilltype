import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MenuItem from './MenuItem'
import styles from './styles'

const SegmentedMenuItem = ({ classes, className, children, ...others }) => (
  <MenuItem
    className={classnames(className, classes.segmentedMenuItem)}
    classes={classes}
    {...others}
  >
    {children}
  </MenuItem>
)
export default injectSheet(styles)(SegmentedMenuItem)
