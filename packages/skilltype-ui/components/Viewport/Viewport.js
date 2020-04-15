import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'

const Viewport = ({
  classes,
  className,
  children,
  style,
  fullscreen,
  centerContent,
}) => (
  <main
    role="application"
    className={classnames([className, classes.viewport], {
      [classes.fullscreen]: fullscreen,
      [classes.centerContent]: centerContent,
    })}
    style={style}
  >
    {children}
  </main>
)

export default injectSheet(styles)(Viewport)
