import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const ResourceList = ({ children, className, classes, style }) => (
  <div
    role="list"
    className={classnames(className, classes.resourceList)}
    style={style}
  >
    {React.Children.map(children, child =>
      React.cloneElement(child, { classes })
    )}
  </div>
)

export default injectSheet(styles)(ResourceList)
