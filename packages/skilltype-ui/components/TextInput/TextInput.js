import React from 'react'
import {
  number,
  string,
  bool,
  func,
  shape,
  oneOfType,
  instanceOf,
} from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Input from '@material-ui/core/Input'
import styles from './styles'

class TextInput extends React.Component {
  static propTypes = {
    /*
     * Will be set by FormInput if rendered as child. Unique key for the input in the FormContext. Determines the value provided to the underlying Input
     */
    id: string,
    /**
     * Name/description of the input
     */
    label: string,
    /**
     * Placeholder needs to be set explictly
     */
    placeholder: string,
    /**
     * Value from FormContext. Can be overridden
     */
    value: oneOfType([string, number]),
    /**
     * Error from FormContext
     */
    error: string,
    /**
     * Update the FormContext value for this input. Key in the FormContext is the id
     */
    onChange: func,
    /**
     * FormContext disabled
     */
    disabled: bool,
    /**
     * FormInput callbacks to handle setting focus
     */
    onFocus: func,
    /**
     * FormInput callbacks to handle setting focus
     */
    onBlur: func,
    /**
     * FormInput focus state
     */
    isFocused: bool,
    /**
     *
     */
    inputRef: oneOfType([func, shape({ current: instanceOf(Element) })]),
  }

  static defaultProps = {
    value: '',
  }

  state = {
    isFocused: false,
  }
  onFocus = () => {
    if (!this.props.onFocus && !this.state.isFocused) {
      this.setState({ isFocused: true })
    }
  }

  onBlur = () => {
    if (!this.props.onBlur && this.state.isFocused) {
      this.setState({ isFocused: false })
    }
  }

  render() {
    const {
      classes,
      className,
      id,
      error,
      placeholder,
      value,
      inputProps,
      onChange,
      disabled,
      isFocused,
      onFocus,
      onBlur,
      inputRef,
      style,
    } = this.props

    return (
      <Input
        className={classnames(className, classes.input, {
          [classes.focus]:
            isFocused !== undefined ? isFocused : this.state.isFocused,
          [classes.error]: Boolean(error),
          [classes.multiline]: inputProps && inputProps.multiline,
        })}
        id={id}
        disableUnderline
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputProps={{
          disabled,
          maxLength: inputProps && inputProps.maxLength,
        }}
        onFocus={onFocus || this.onFocus}
        onBlur={onBlur || this.onBlur}
        inputRef={
          inputRef ||
          (node => {
            this.inputRef = node
          })
        }
        style={style}
        {...inputProps}
      />
    )
  }
}

export default injectSheet(styles)(TextInput)
