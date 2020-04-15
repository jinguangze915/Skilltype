import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import { getAriaProps } from '../../lib/props'

const AriaOnly = ({ className, classes, children, id, ...others }) => (
  <div
    id={id}
    className={classnames(className, classes.ariaOnly)}
    {...getAriaProps(others)}
  >
    {children}
  </div>
)

export default injectSheet(styles)(AriaOnly)
