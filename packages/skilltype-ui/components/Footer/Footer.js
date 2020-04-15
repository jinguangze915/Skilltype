import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const Footer = ({ classes, className, children, style }) => (
  <footer className={classnames(className, classes.footer)} style={style}>
    {children}
  </footer>
)

export default injectSheet(styles)(Footer)
