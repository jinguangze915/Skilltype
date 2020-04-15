import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import MaskedInput from 'react-text-mask'
import TextInput from './TextInput'
import styles from './styles'

const ZipMask = ({ inputRef, ...others }) => (
  <MaskedInput
    {...others}
    ref={e => {
      if (inputRef && e && e.inputElement) {
        inputRef(e.inputElement)
      }
    }}
    guide={false}
    mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
    placeholderChar={`${'\u2000'}`}
  />
)

const ZipInput = ({
  classes,
  className,
  children,
  placeholder,
  inputProps,
  ...others
}) => (
  <TextInput
    className={classnames(className, classes.zipInput)}
    inputProps={{
      ...inputProps,
      // atrribute will end up on the underlying <input> element which will cause
      // the numeric keyboard to come up for the zipcode input
      inputComponent: ZipMask,
      inputProps: {
        inputMode: 'numeric',
        pattern: '[0-9]*',
      },
    }}
    placeholder={placeholder}
    {...others}
  >
    {children}
  </TextInput>
)

ZipInput.defaultProps = {
  placeholder: '70115',
}

export default injectSheet(styles)(ZipInput)
