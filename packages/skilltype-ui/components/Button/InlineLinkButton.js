import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import TransparentButton from './TransparentButton'

const InlineLinkButton = ({ classes, className, children, ...others }) => (
  <TransparentButton
    className={classnames([className, classes.inlineLinkButton])}
    {...others}
  >
    {children}
  </TransparentButton>
)

export default injectSheet(styles)(InlineLinkButton)
