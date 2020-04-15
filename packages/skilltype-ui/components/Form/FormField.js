import React from 'react'
import { string, bool } from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import { withFormContext } from './Form'
import styles from './styles'

class FormField extends React.Component {
  static propTypes = {
    /** Render label and input inline */
    inline: bool,
    /** Render label when input is multi-line */
    multiline: bool,
    /** Unique key for the input in the FormContext. Determines the value provided to the underlying Input */
    id: string,
    /** Input label */
    label: string,
    /** Help information rendered below the input */
    helperText: string,
    /** Provided by FormContext, can be overridden */
    error: string,
  }
  static defaultProps = {
    inline: false,
    multiline: false,
  }
  state = {
    isFocused: false,
  }
  onFocus = () => {
    if (this.state.isFocused) return
    this.setState({ isFocused: true })
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }
  onBlur = () => {
    if (!this.state.isFocused) return
    this.setState({ isFocused: false })
  }
  // Create a ref to forward to a child input component (if needed)
  inputRef = React.createRef()

  render() {
    const {
      inline,
      multiline,
      classes,
      className,
      id,
      label,
      helperText,
      error,
      onChange,
      value,
      placeholder,
      disabled,
      style,
    } = this.props

    const children = React.Children.map(this.props.children, child =>
      // Pass the id, placeholder, onChange, disabled and value down
      // so the Input can correctly connect using withFormContext

      React.cloneElement(child, {
        id,
        onChange,
        value,
        placeholder,
        disabled,
        style,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        isFocused: this.state.isFocused,
        inputRef: this.inputRef,
      })
    )

    return (
      <label
        htmlFor={id}
        className={classnames(className, classes.formField, {
          [classes.inline]: inline,
          [classes.focus]: this.state.isFocused,
          [classes.error]: Boolean(error),
        })}
      >
        <div
          className={classnames(classes.fieldWrapper, {
            [classes.inline]: inline,
          })}
        >
          {label && (
            <div
              className={classnames(classes.label, {
                [classes.inline]: inline,
                [classes.multiline]: multiline,
              })}
            >
              {label}
            </div>
          )}
          {children}
        </div>
        <div
          className={classnames(classes.helperText, {
            [classes.inline]: inline,
            [classes.error]: error,
          })}
        >
          {error || helperText || ``}
        </div>
      </label>
    )
  }
}

export default injectSheet(styles)(withFormContext(FormField))
