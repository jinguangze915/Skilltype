import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const ResourceInfo = ({ children, className, classes, style }) => (
  <div className={classnames(className, classes.resourceInfo)} style={style}>
    {children}
  </div>
)

export default injectSheet(styles)(ResourceInfo)
