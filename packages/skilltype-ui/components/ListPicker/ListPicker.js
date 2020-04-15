/* eslint-disable
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/interactive-supports-focus ,
  jsx-a11y/mouse-events-have-key-events
*/
import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import scrollIntoView from 'scroll-into-view-if-needed'
import styles from './styles'
import CheckSvg from '../../assets/check.svg'
import { getAriaProps } from '../../lib/props'
import CloseButton from '../Button/CloseButton'
import SearchSvg from '../../assets/search.svg'
import Progress from '../Progress/Progress'

class ListPicker extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.statusRef = React.createRef()
    this.filterStatusRef = React.createRef()
    this.listboxRef = React.createRef()

    // we start in keyboard mode and set this to false on mousemove
    // this prevents arbitrary mouse hovering from interfering with keyboard
    //   navigation
    this.keyboardMode = true
  }
  componentDidUpdate(prevProps) {
    const { suggestions } = this.props
    if (suggestions.length !== prevProps.suggestions.length) {
      if (this.statusRef.current) {
        this.statusRef.current.textContent = ''
      }
      if (this.filterStatusRef.current) {
        this.filterStatusRef.current.textContent = this.getFilterStatus()
      }
    }
  }
  onQueryChange = e => {
    if (this.listboxRef.current) {
      this.listboxRef.current.scrollTo(0, 0)
    }

    if (this.props.onQueryChange) {
      this.props.onQueryChange(e.target.value)
    }
  }
  onActiveIndexChange = index => {
    if (this.props.onActiveIndexChange) {
      this.props.onActiveIndexChange(index)
    }
  }
  onListboxFocus = () => this.onFocus()
  onInputKeyDown = e => {
    if (this.props.disabled) {
      return
    }
    // switch back to keyboard mode until the next mousemove
    this.keyboardMode = true
    const { suggestions, activeIndex, onItemSelected, selected } = this.props
    switch (e.keyCode) {
      case 40: {
        // Down arrow
        this.advanceActiveOption(1)
        e.preventDefault()
        break
      }
      case 38: {
        // Up arrow
        this.advanceActiveOption(-1)
        e.preventDefault()
        break
      }
      case 32: {
        // spacebar
        if (activeIndex >= 0) {
          if (onItemSelected) {
            const id = suggestions[activeIndex].id
            this.statusRef.current.textContent = `${
              selected[id] ? 'You unselected:' : 'You selected: '
            } ${suggestions[activeIndex].fullName}`
            onItemSelected(suggestions[activeIndex].id, activeIndex)
          }
          e.preventDefault()
        }
        break
      }
      case 27: {
        // escape
        if (this.props.onClearInput) {
          this.props.onClearInput()
        }
        e.preventDefault()
        break
      }
      default: {
        break
      }
    }
  }
  onListboxKeyDown = e => {
    if (this.props.isCombo) {
      return
    }
    this.onInputKeyDown(e)
  }
  onMouseMove = () => {
    this.keyboardMode = false
  }
  onInputRef = e => {
    this.inputRef.current = e
    if (this.props.inputRef) {
      this.props.inputRef.current = e
    }
  }
  onListboxRef = e => {
    this.listboxRef.current = e
    if (this.props.listboxRef) {
      this.props.listboxRef.current = e
    }
  }
  getFilterStatus = () => {
    const length = this.props.suggestionsByType
    const items = length === 1 ? 'item' : 'items'
    return `${length} ${items}`
  }
  makeOnOptionClick = (id, idx) => () => {
    if (this.props.disabled) {
      return
    }
    const { onItemSelected } = this.props
    if (onItemSelected) {
      onItemSelected(id, idx)
    }
    if (this.props.isAlwaysCombo) {
      this.inputRef.current.focus()
    }
  }
  makeOnOptionMouseOver = idx => () => {
    if (this.props.disabled) {
      return
    }
    if (this.keyboardMode) {
      return
    }
    this.onActiveIndexChange(idx)
  }
  makeOptionRef = idx => e => {
    if (e && this.keyboardMode && idx === this.props.activeIndex) {
      scrollIntoView(e, { scrollMode: 'if-needed' })
    }
  }
  advanceActiveOption = incrementBy => {
    const { suggestions, activeIndex } = this.props
    let nextIndex = activeIndex + incrementBy
    if (nextIndex === suggestions.length) {
      nextIndex = 0
    } else if (nextIndex < 0) {
      nextIndex = suggestions.length - 1
    }
    this.onActiveIndexChange(nextIndex)
  }

  render() {
    const {
      classes,
      className,
      style,
      query,
      suggestions,
      placeholder,
      ariaLabel,
      isMultiSelect,
      activeIndex,
      id,
      selected,
      disabled,
      selectedColor,
      onInputFocus,
      onClearInput,
      isCombo,
      isAlwaysCombo,
      listboxRef,
      noResultsMessage,
      addMobileKeyboardPadding,
      theme,
      ListFallback,
      ...others
    } = this.props
    const comboProps = {
      role: 'combobox',
      'aria-haspopup': 'listbox',
      'aria-owns': `${id}-listbox`,
      'aria-expanded': true,
      'aria-controls': `${id}-listbox`,
      onKeyDown: this.onInputKeyDown,
      'aria-autocomplete': 'list',
      'aria-activedescendant':
        suggestions.length && activeIndex >= 0 && suggestions[activeIndex]
          ? `${id}.${suggestions[activeIndex].id}`
          : null,
      ...getAriaProps(others),
    }

    return (
      <div
        className={classnames(className, classes.listPicker)}
        style={style}
        onMouseMove={this.onMouseMove}
      >
        <div className={classes.inputContainer}>
          <SearchSvg className={classes.searchSvg} />
          <input
            type="text"
            disabled={disabled}
            className={classes.queryInput}
            placeholder={placeholder}
            value={query}
            onChange={this.onQueryChange}
            onFocus={onInputFocus}
            ref={this.onInputRef}
            {...(isCombo ? comboProps : {})}
          />
          {(isCombo && !isAlwaysCombo) || (query && query.length) ? (
            <CloseButton
              className={classes.clearInputButton}
              onClick={onClearInput}
              aria-label="clear search"
            />
          ) : null}
        </div>
        <div role="alert" className={classes.ariaStatus} ref={this.statusRef} />
        <div
          role="status"
          className={classes.ariaStatus}
          ref={this.filterStatusRef}
        >
          {this.getFilterStatus()}
        </div>
        {suggestions instanceof Promise ? (
          <ListFallback />
        ) : (
          <div
            id={`${id}-listbox`}
            className={classes.listbox}
            role="listbox"
            aria-multiselectable={isMultiSelect}
            ref={this.onListboxRef}
            style={
              addMobileKeyboardPadding && this.listboxRef.current
                ? {
                    paddingBottom: `${this.listboxRef.current.clientHeight -
                      90}px`,
                  }
                : {}
            }
            {...(isAlwaysCombo
              ? {}
              : {
                  tabIndex: 0,
                  onKeyDown: this.onInputKeyDown,
                })}
          >
            {suggestions.map((suggestion, idx) => {
              if (id === 'pickOrg') {
                return (
                  <div
                    role="option"
                    aria-label={`${suggestion.fullName} ${
                      selected[suggestion.uniqueName]
                        ? ', selected'
                        : ', unselected'
                    }`}
                    aria-selected={idx === activeIndex}
                    id={`${id}.${suggestion.uniqueName}`}
                    key={suggestion.uniqueName}
                    className={classnames(classes.option, {
                      [classes.selected]: selected[suggestion.uniqueName],
                      [classes.active]: idx === activeIndex,
                      [classes.isMember]: suggestion.affiliated,
                    })}
                    onClick={this.makeOnOptionClick(suggestion.uniqueName, idx)}
                    onMouseOver={this.makeOnOptionMouseOver(idx)}
                    ref={this.makeOptionRef(idx)}
                    style={
                      selected[suggestion.uniqueName] && selectedColor
                        ? { color: selectedColor }
                        : null
                    }
                  >
                    {suggestion.fullName}
                    {selected[suggestion.uniqueName] && <CheckSvg />}
                  </div>
                )
              }
              return (
                <div
                  role="option"
                  aria-label={`${suggestion.name} ${
                    selected[suggestion.id] ? ', selected' : ', unselected'
                  }`}
                  aria-selected={idx === activeIndex}
                  id={`${id}.${suggestion.Id}`}
                  key={suggestion.Id}
                  className={classnames(classes.option, {
                    [classes.selected]: selected[suggestion.id],
                    [classes.active]: idx === activeIndex,
                  })}
                  onClick={this.makeOnOptionClick(suggestion.id, idx)}
                  onMouseOver={this.makeOnOptionMouseOver(idx)}
                  ref={this.makeOptionRef(idx)}
                  style={
                    selected[suggestion.id] && selectedColor
                      ? { color: selectedColor }
                      : null
                  }
                >
                  {suggestion.name}
                  {selected[suggestion.id] && <CheckSvg />}
                </div>
              )
            })}
            {!suggestions.length && (
              <div className={classes.noResults}>{noResultsMessage}</div>
            )}
          </div>
        )}
      </div>
    )
  }
}

ListPicker.defaultProps = {
  isCombo: true,
  isAlwaysCombo: true,
  ListFallback: Progress,
}

export default injectSheet(styles)(ListPicker)
