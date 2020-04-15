import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const TextDivider = ({ children, classes, className, style }) => (
  <div className={classnames(className, classes.divider)} style={style}>
    {children}
  </div>
)

export default injectSheet(styles)(TextDivider)
