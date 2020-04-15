import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const CardContent = ({ classes, className, children, centered, style }) => (
  <div
    className={classnames(className, classes.cardContent)}
    style={{ ...style, ...(centered ? { textAlign: 'center' } : {}) }}
  >
    {children}
  </div>
)

export default injectSheet(styles)(CardContent)
