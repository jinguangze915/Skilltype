import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const CardHeading = ({ classes, className, children, style }) => (
  <div
    role="heading"
    aria-level="3"
    className={classnames(className, classes.cardHeading)}
    style={style}
  >
    {children}
  </div>
)

export default injectSheet(styles)(CardHeading)
