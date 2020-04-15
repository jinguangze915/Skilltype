import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import jss from 'jss'
import jssPreset from 'jss-preset-default'
import Autosuggest from 'react-autosuggest'
import IsolatedScroll from 'react-isolated-scroll'
import { lockBodyScrollToTop, unlockBodyScroll } from '../../lib/dom'
import styles from './styles'
import autosuggestStyles from './autosuggest-styles'

jss.setup(jssPreset())

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.suggestionsContainerRef = null
    this.bodyScrollIsLocked = false
    this.inputRef = null
    this.dimWidth = 20

    this.autosuggestClasses = jss
      .createStyleSheet(autosuggestStyles(false)(props.theme))
      .attach().classes
    this.autosuggestModalClasses = jss
      .createStyleSheet(autosuggestStyles(true)(props.theme))
      .attach().classes

    this.state = {
      suggestions: this.props.initialSuggestions || [],
      widthIsCached: false,
      autosuggestClasses: this.autosuggestClasses,
      isModal: false,
    }
  }
  componentDidUpdate(prevProps) {
    const isModal = Boolean(this.props.isModal && this.props.query.length)
    // update state if needed
    /* eslint-disable react/no-did-update-set-state */
    if (this.state.isModal !== isModal) {
      this.setState({
        autosuggestClasses: isModal
          ? this.autosuggestModalClasses
          : this.autosuggestClasses,
        isModal,
      })
    }
    /* eslint-enable react/no-did-update-set-state */
    if (isModal) {
      // inline=>modal, add listeners and reset inline input ref
      if (this.props.lockBodyScroll && !this.bodyScrollIsLocked) {
        lockBodyScrollToTop()
        this.bodyScrollIsLocked = true
      }
    } else if (this.props.lockBodyScroll && this.bodyScrollIsLocked) {
      // modal=>inline, remove listeners and reset modal input ref
      unlockBodyScroll()
    }
    // onShowSuggestions
    if (this.props.onShowSuggestions) {
      if (!prevProps.query.length && this.props.query.length) {
        this.props.onShowSuggestions(true)
      }
      if (prevProps.query.length && !this.props.query.length) {
        this.props.onShowSuggestions(false)
      }
    }
  }
  componentWillUnmount() {
    this.inputRef.removeEventListener('focus', this.onFocus)
    this.inputRef.removeEventListener('blur', this.onBlur)
  }
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: this.props.initialSuggestions || [],
      widthIsCached: false,
    })
    if (this.props.onShowSuggestions) {
      this.props.onShowSuggestions(false)
    }
  }
  onSuggestionSelected = (evt, { suggestion }) => {
    this.props.onSubmit(suggestion)
  }
  onSuggestionsFetchRequested = async req => {
    const suggestions = await this.props.getSuggestions(req.value)
    this.setState({ suggestions }, () => {
      this.suggestionsContainerRef.component.scrollTop = 0
    })
  }
  onKeyDown = event => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event)
    }
    // if enter is pressed and no suggestions are present,
    //   trigger onSubmit event
    if (
      !this.state.suggestions.length &&
      event.keyCode === 13 &&
      this.props.query.trim().length &&
      this.props.onSubmit
    ) {
      this.props.onSubmit()
    }
  }
  onChange = (event, { newValue, method }) => {
    if (method === 'type' && this.props.onQueryChange) {
      this.props.onQueryChange(newValue)
    }
  }
  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus()
    }
    this.setState({
      widthIsCached: false,
    })
  }
  onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur()
    }
    this.setState({
      widthIsCached: false,
    })
  }
  renderInputComponent = inputProps => {
    const { shouldClearOnBlur, inputRef } = this.props
    return (
      <div className={this.state.autosuggestClasses.inputContainer}>
        <input
          {...inputProps}
          onBlur={shouldClearOnBlur ? inputProps.onBlur : null}
          style={{
            width: Math.max(this.dimWidth + 10, 20),
          }}
          ref={e => {
            if (inputRef) {
              inputRef(e)
            }
            if (e && !this.inputRef) {
              e.addEventListener('focus', this.onFocus)
              e.addEventListener('blur', this.onBlur)
            }
            this.inputRef = e
            inputProps.ref(e)
          }}
        />
        <div
          ref={elem => {
            if (!elem) return
            this.dimWidth = elem.clientWidth
            if (!this.state.widthIsCached) {
              this.setState({ widthIsCached: true })
            }
          }}
          className={this.state.autosuggestClasses.inputShadow}
        >
          {inputProps.value || inputProps.placeholder}
        </div>
      </div>
    )
  }
  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { ref, ...restContainerProps } = containerProps
    const { suggestions, autosuggestClasses } = this.state
    const { noResultsMessage, query } = this.props
    return (
      <IsolatedScroll
        {...restContainerProps}
        ref={e => {
          this.suggestionsContainerRef = e
          ref(e)
        }}
      >
        {query &&
          !suggestions.length &&
          noResultsMessage && (
            <div
              className={classnames(
                autosuggestClasses.suggestionsContainerOpen,
                autosuggestClasses.noResultsMessage
              )}
              role="heading"
            >
              {noResultsMessage.replace('$QUERY', query)}
            </div>
          )}
        {children}
      </IsolatedScroll>
    )
  }
  renderAutosuggest() {
    const { suggestions, autosuggestClasses } = this.state
    const { query, placeholder } = this.props
    const inputProps = {
      value: query,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      placeholder,
    }
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        focusInputOnSuggestionClick
        inputProps={inputProps}
        getSuggestionValue={suggestion => suggestion.name}
        theme={autosuggestClasses}
        highlightFirstSuggestion
        renderInputComponent={this.renderInputComponent}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={suggestion => suggestion.name}
      />
    )
  }
  render() {
    const { style, className, classes } = this.props

    return (
      <div className={classnames(className, classes.search)} style={style}>
        {this.renderAutosuggest()}
      </div>
    )
  }
}

Search.defaultProps = {
  lockBodyScroll: true,
  shouldClearOnBlur: true,
}

export default injectSheet(styles)(Search)
