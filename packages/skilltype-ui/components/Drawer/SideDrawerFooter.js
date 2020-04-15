import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import { version } from '../../../../package.json'

const SideDrawerFooter = ({ classes, className, children, style }) => (
  <div
    className={classnames(className, classes.sideDrawerFooter)}
    style={style}
  >
    © 2019 Skilltype · v{version}
    {children}
  </div>
)

export default injectSheet(styles)(SideDrawerFooter)
