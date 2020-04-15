import React from 'react'
import MaterialDrawer from '@material-ui/core/Drawer'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const SideDrawer = ({ classes, className, children, open, onClose, style }) => (
  <MaterialDrawer anchor="left" open={open} onClose={onClose}>
    <div className={classnames(className, classes.sideDrawer)} style={style}>
      {children}
    </div>
  </MaterialDrawer>
)

export default injectSheet(styles)(SideDrawer)
