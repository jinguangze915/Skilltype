import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import TransparentButton from './TransparentButton'

const PrimaryTextButton = ({ classes, className, children, ...others }) => (
  <TransparentButton
    className={classnames([className, classes.primaryTextButton])}
    {...others}
  >
    {children}
  </TransparentButton>
)

export default injectSheet(styles)(PrimaryTextButton)
