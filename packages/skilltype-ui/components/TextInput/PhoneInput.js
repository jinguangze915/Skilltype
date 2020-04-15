import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MaskedInput from 'react-text-mask'
import TextInput from './TextInput'
import styles from './styles'

const PhoneMask = ({ inputRef, ...others }) => (
  <MaskedInput
    {...others}
    ref={e => {
      if (inputRef && e && e.inputElement) {
        inputRef(e.inputElement)
      }
    }}
    guide={false}
    mask={[
      '(',
      /[1-9]/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ]}
    placeholderChar={`${'\u2000'}`}
  />
)

const PhoneInput = ({
  classes,
  className,
  children,
  placeholder,
  ...others
}) => (
  <TextInput
    className={classnames(className, classes.phoneInput)}
    inputProps={{
      type: 'tel',
      startAdornment: <span className={classes.prefix}>+1</span>,
      inputComponent: PhoneMask,
    }}
    placeholder={placeholder}
    {...others}
  >
    {children}
  </TextInput>
)

PhoneInput.defaultProps = {
  placeholder: '(504) 867-5309',
}

export default injectSheet(styles)(PhoneInput)
