import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const DropdownToggle = ({
  classes,
  className,
  children,
  style,
  onClick,
  separator,
}) => (
  <li>
    {separator ? (
      <div className={classes.separator} />
    ) : (
      <button
        className={classnames(className, classes.item)}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    )}
  </li>
)

export default injectSheet(styles)(DropdownToggle)
