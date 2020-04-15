import React from 'react'
import {
  bool,
  number,
  string,
  func,
  array,
  object,
  shape,
  arrayOf,
  oneOfType,
} from 'prop-types'
import ReactSelect from 'react-select'
import shallowEq from 'shallowequal'
import { withTheme } from 'react-jss'
import { mergeSelectStyles, reactSelectStyles } from './styles'

class Select extends React.Component {
  static propTypes = {
    /**
     * TextInput is rendered inline with labels. Passed in from FromInput
     */
    inline: bool,
    /**
     * Will be set by FormInput if rendered as child. Unique key for the input
     * in the FormContext. Determines the value provided to the underlying Input
     */
    id: string,
    /** Name/description of the input */
    label: string,
    /** Additional information rendered below the input. */
    helperText: string,
    /** Placeholder needs to be set explictly */
    placeholder: string,
    /** Value from FormContext. Can be overridden */
    value: oneOfType([number, string, bool, array, object]),
    /** Error from FormContext */
    error: string,
    /** Update the FormContext value for this input. Key in the FormContext is the id */
    onChange: func,
    /** FormContext disabled */
    disabled: bool,
    /**
     * Options is an array of {label, value} pairs. No two items can have the
     * same value, otherwise the Select will be unable to determine which one is
     * selected.
     */
    options: arrayOf(
      shape({
        label: string.isRequired,
        value: oneOfType([number, bool, string, array, object]),
      })
    ).isRequired,
    /** Clearable controls the `x` button rendered on the right of the select that clears the selected value */
    clearable: bool,
    /** Searchable controls whether the user can tpye input into the select to fuzzy search the options */
    searchable: bool,
    /**
     * Style overrides is given the component props and returns an object that
     * is a style mapping object for the react-select component. For the
     * possible style override keys and correct function signature, see
     * https://react-select.com/styles
     *
     * @param {Object} props Takes the Select component props
     * @returns {Object}
     */
    stylesOverrides: func,
  }

  static defaultProps = {
    disabled: false,
    clearable: true,
    searchable: true,
    placeholder: 'Select or start typing...',
    onChange: () => {},
    stylesOverrides: () => ({}),
  }

  /*
   * It's important that the Select component does not kjk/c
   */
  shouldComponentUpdate(nextProps) {
    const {
      inline,
      error,
      value,
      disabled,
      clearable,
      searchable,
      inputProps,
    } = this.props
    const {
      inline: inlineNext,
      error: errorNext,
      value: valueNext,
      disabled: disabledNext,
      clearable: clearableNext,
      searchable: searchableNext,
      inputProps: inputPropsNext,
    } = nextProps

    const shouldUpdate =
      value !== valueNext ||
      inline !== inlineNext ||
      error !== errorNext ||
      disabled !== disabledNext ||
      clearable !== clearableNext ||
      searchable !== searchableNext ||
      !shallowEq(inputProps, inputPropsNext)

    return shouldUpdate
  }

  handleOnChange = (option, { action }) => {
    if (action === 'clear' || action === 'clear-option') {
      return this.props.onChange({ target: { value: null } })
    }
    const event = { target: { value: option.value } }
    return this.props.onChange(event)
  }

  // React-select expects the value prop to be an object of both label and value
  // `{label: '', value: ''}`
  // However we only get back the value from the server
  // To fix this, make a map of [value] -> {label: '', value: ''} from the options
  // and get the assiocated label+value pair from the options.
  valueMap = this.props.options.reduce(
    (acc, { label, value }) => ({
      ...acc,
      [value]: { label, value },
    }),
    {}
  )

  render() {
    const {
      id,
      clearable,
      disabled,
      searchable,
      stylesOverrides,
      placeholder,
      inputProps,
      options,
      value,
    } = this.props

    const combinedStyles = mergeSelectStyles(
      reactSelectStyles,
      stylesOverrides
    )(this.props)

    const selectedValue = this.valueMap[value]

    return (
      <ReactSelect
        id={id}
        styles={combinedStyles}
        autoFocus={false}
        isSearchable={searchable}
        isClearable={clearable}
        isDisabled={disabled}
        placeholder={placeholder}
        onChange={this.handleOnChange}
        options={options}
        value={selectedValue}
        {...inputProps}
      />
    )
  }
}

export default withTheme(Select)
