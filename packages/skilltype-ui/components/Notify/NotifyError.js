import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Notify from './Notify'
import styles from './styles'

const NotifyError = ({ classes, className, children, ...others }) => (
  <Notify
    className={classnames(className, classes.error)}
    {...others}
    classes={classes}
  >
    {children}
  </Notify>
)

export default injectSheet(styles)(NotifyError)
