import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import TextInput from './TextInput'
import styles from './styles'

const EmailInput = ({
  classes,
  className,
  children,
  placeholder,
  ...others
}) => (
  <TextInput
    className={classnames(className, classes.emailInput)}
    inputProps={{ type: 'email' }}
    placeholder={placeholder}
    {...others}
  >
    {children}
  </TextInput>
)

EmailInput.defaultProps = {
  placeholder: '(e.g. gmail.com or yahoo.com)',
}

export default injectSheet(styles)(EmailInput)
