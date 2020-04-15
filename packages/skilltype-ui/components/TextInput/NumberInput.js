import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import TextInput from './TextInput'
import styles from './styles'

const NumberInput = ({
  classes,
  className,
  children,
  placeholder,
  onChange,
  inputProps,
  ...others
}) => (
  <TextInput
    className={classnames(className, classes.numberInput)}
    placeholder={placeholder}
    onChange={event =>
      onChange({ target: { value: Number(event.target.value) } })
    }
    inputProps={{
      type: 'number',
      ...inputProps,
    }}
    {...others}
  >
    {children}
  </TextInput>
)

export default injectSheet(styles)(NumberInput)
