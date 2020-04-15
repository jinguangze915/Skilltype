import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import TextInput from './TextInput'
import styles from './styles'

const LongTextInput = ({ classes, className, children, ...others }) => (
  <TextInput
    className={classnames(className, classes.emailInput)}
    inputProps={{ multiline: true }}
    {...others}
  >
    {children}
  </TextInput>
)

export default injectSheet(styles)(LongTextInput)
