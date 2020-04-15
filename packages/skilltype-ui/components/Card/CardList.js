import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const CardList = ({ classes, className, children, style }) => (
  <div className={classnames(className, classes.cardList)} style={style}>
    {React.Children.map(
      children,
      child => (child ? React.cloneElement(child, { classes }) : null)
    )}
  </div>
)

export default injectSheet(styles)(CardList)
