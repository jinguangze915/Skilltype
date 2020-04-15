import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const ResourceListItem = ({ children, className, classes, style }) => (
  <div
    role="listitem"
    className={classnames(className, classes.resourceListItem)}
    style={style}
  >
    {React.Children.map(
      children,
      child => child && React.cloneElement(child, { classes })
    )}
  </div>
)

export default injectSheet(styles)(ResourceListItem)
