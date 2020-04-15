import React from 'react'
import { string, shape, func, bool } from 'prop-types'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import shallowequal from 'shallowequal'
import { validateEmail, isObjectEmpty } from '@skilltype/data/utils'
import styles from './styles'

const { Consumer, Provider } = React.createContext()
const ERROR_REQUIRED = 1

/**
 * `<Form />` is a controlled component that takes `values` from is parent component (which should maintain the state for values).
 *
 * For other components to access the form Context, use HOC `withFormContext(Component)`
 */
class Form extends React.Component {
  static propTypes = {
    /** Unique key for form context */
    id: string.isRequired,
    /**
     * Submit button should be disbaled until all required fields are valid
     */
    disableSubmitUntilValid: bool,
    /**
     * Form is a controlled component, meaning the Form values must live in
     * state outside of `<Form />`. The `value` prop will be used as `<Provider
     * value={props.value} />` for all components connecting using
     * `withFormContext`.
     *
     * `values` is a mapping
     *
     * ```
     * {
     *   [inputId]: value
     * }
     * ```
     */
    values: shape({}).isRequired,
    /**
     * Errors can optionally be passed in as props to `<Form />`
     *
     * `errors` is a mapping
     *
     * ```
     * {
     *  [inputId]: 1
     * }
     * ```
     */
    errors: shape({}),
    /**
     * Provide an function to be called when the `<Form />` has been submitted
     *
     * @param {Event} event
     * @param {Object} meta
     * @param {Boolean} meta.isValid
     */
    onSubmit: func,
    /**
     * Provie a function to be called when the `<Form />` values have changed
     *
     * @param {Object} values
     */
    onChange: func,
    /**
     * To get access to the Context value, `contextRef` will be called and provided the form Context to be used outside of the `<Form />` subtree.
     *
     * @param {Object} context
     * @param {String} context.formId
     * @param {Object} context.values
     * @param {Object} context.errors
     * @param {Boolean} context.isValid
     * @param {Boolean} context.disabled
     * @param {Boolean} context.canSubmit
     * @param {Function} context.onChange
     * @param {Function} context.submit
     * @param {Function} context.updateCanSubmit
     * @param {Function} context.registerField
     * @param {Function} context.getErrors
     */
    contextRef: func,
  }

  static defaultProps = {
    disableSubmitUntilValid: true,
    errors: {},
  }

  constructor(props) {
    super(props)
    this.fields = {}
    this.baseContext = this.getBaseContext()
    this.currentContext = this.baseContext
  }
  state = {
    errors: {},
  }
  onSubmit = e => {
    if (e) {
      e.preventDefault()
    }
    const errors = this.getErrors()
    this.setState({ errors })
    if (this.props.onSubmit) {
      this.props.onSubmit(e, { isValid: isObjectEmpty(errors) })
    }
  }
  getErrors = () => {
    const _errors = this.props.errors || {}
    // if we're blocking submit before required are filled, don't show required
    //   as errors
    if (this.props.disableSubmitUntilValid) {
      return _errors
    }
    // gather required errors
    const errors = Object.keys(this.fields).reduce(
      (errors, fieldId) => {
        const currentField = this.fields[fieldId]

        if (fieldId === 'secondaryEmail') {
          if (
            this.props.values.secondaryEmail != null &&
            this.props.values.secondaryEmail !== '' &&
            !validateEmail(this.props.values[fieldId])
          ) {
            errors[fieldId] = ERROR_REQUIRED
          }
        } else {
          if (currentField.required && !this.props.values[fieldId]) {
            errors[fieldId] = ERROR_REQUIRED
          }
          if (
            currentField.required &&
            currentField.isEmail &&
            !validateEmail(this.props.values[fieldId])
          ) {
            errors[fieldId] = ERROR_REQUIRED
          }
        }
        return errors
      },
      { ..._errors }
    )
    return errors
  }
  getBaseContext = () => ({
    formId: this.props.id,
    onChange: (id, e) => {
      const nextValues = { ...this.props.values, [id]: e.target.value }
      if (this.props.onChange) {
        this.props.onChange({ values: nextValues })
      }
    },
    registerField: (id, props) => {
      if (!id) {
        return
      }
      if (this.fields[id]) {
        console.warn('Duplicate field id', `${this.props.formId}.${id}`)
      }
      this.fields[id] = props
    },
    errors: this.state.errors,
    updateCanSubmit: () => {
      this.forceUpdate()
    },
    submit: () => {
      this.onSubmit()
    },
  })

  render() {
    const {
      classes,
      className,
      style,
      id: formId,
      values,
      children,
      disabled,
      contextRef,
    } = this.props
    const isValid = Object.keys(this.fields).every(
      id => !this.fields[id].required || this.props.values[id]
    )
    this.currentContext = {
      ...this.baseContext,
      values,
      errors: this.state.errors,
      disabled,
      isValid,
      canSubmit: !this.props.disableSubmitUntilValid || isValid,
    }
    if (contextRef) {
      contextRef(this.currentContext)
    }
    return (
      <Provider value={this.currentContext}>
        <form
          id={formId}
          className={classnames(className, classes.form, {
            [classes.disabled]: disabled,
          })}
          style={style}
          onSubmit={this.onSubmit}
          noValidate
          disabled={disabled}
        >
          {children}
        </form>
      </Provider>
    )
  }
}

export default injectSheet(styles)(Form)

class FormComponent extends React.Component {
  componentWillMount() {
    const { formContext, id, required } = this.props
    const lowercaseLabel =
      (this.props.children.props.label || '') &&
      this.props.children.props.label.toLowerCase()

    const isEmail = lowercaseLabel.includes('email')
    if (formContext) {
      formContext.registerField(id, { required, isEmail })
      if (required) {
        formContext.updateCanSubmit()
      }
    }
  }
  shouldComponentUpdate(prevProps) {
    if (this.props.alwaysUpdateOnFormChange) {
      return true
    }
    // if update was _not_ triggered by a form value change, pass it on
    if (
      shallowequal(prevProps.formContext.values, this.props.formContext.values)
    ) {
      return true
    }
    return (
      prevProps.formContext.values[this.props.id] !==
      this.props.formContext.values[this.props.id]
    )
  }
  onChange = e => this.props.formContext.onChange(this.props.id, e)
  render() {
    return React.cloneElement(this.props.children, {
      onChange: this.onChange,
    })
  }
}
FormComponent.defaultProps = {
  alwaysUpdateOnFormChange: false,
}

export const withFormContext = Wrapped => ({
  id,
  required,
  missingRequiredError,
  alwaysUpdateOnFormChange,
  disabled,
  error,
  ...others
}) => (
  <Consumer>
    {context => {
      if (!context) {
        return <Wrapped id={id} {...others} disabled={disabled} error={error} />
      }

      const errorMsg =
        context.errors[id] === ERROR_REQUIRED ? missingRequiredError : error

      return (
        <FormComponent
          id={id}
          formContext={context}
          required={required}
          alwaysUpdateOnFormChange={alwaysUpdateOnFormChange}
        >
          <Wrapped
            {...others}
            value={context.values[id]}
            formContext={context}
            id={`${context.formId}_${id}`}
            error={errorMsg}
            disabled={context.disabled || disabled}
          />
        </FormComponent>
      )
    }}
  </Consumer>
)
