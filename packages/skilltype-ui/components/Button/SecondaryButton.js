import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import styles from './styles'
import Button from './Button'

const SecondaryButton = ({ classes, className, children, ...props }) => (
  <Button
    className={classnames([className, classes.secondaryButton])}
    {...props}
  >
    {children}
  </Button>
)

export default injectSheet(styles)(SecondaryButton)
