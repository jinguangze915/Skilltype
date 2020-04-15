import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const Row = ({ classes, className, children, style, tight }) => (
  <div
    role="cell"
    className={classnames(className, classes.row, {
      [classes.tight]: tight,
    })}
    style={style}
  >
    {children}
  </div>
)

export default injectSheet(styles)(Row)
