import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const Content = ({ classes, className, children, style }) => (
  <div className={classnames([className, classes.content])} style={style}>
    {children}
  </div>
)

export default injectSheet(styles)(Content)
