import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const MenuSection = ({ classes, className, children, style, title }) => {
  const _children = React.Children.map(children, child =>
    React.cloneElement(child, { classes })
  )
  return (
    <section
      className={classnames(className, classes.menuSection)}
      style={style}
    >
      <div className={classes.menuSectionTitle}>{title}</div>
      {_children}
    </section>
  )
}

export default injectSheet(styles)(MenuSection)
