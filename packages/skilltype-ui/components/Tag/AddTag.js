import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Search from '../Search/Search'
import styles from './styles'

class AddTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queryPlaceholder: props.noFocusQueryPlaceholder || props.queryPlaceholder,
    }
  }
  onKeyDown = event => {
    if (
      event.keyCode === 8 &&
      !this.props.query.length &&
      this.props.onDelete
    ) {
      this.props.onDelete()
    }
  }
  onSubmit = suggestion => {
    if (suggestion) {
      this.props.onAdd(suggestion)
    } else if (!this.props.onlySuggestedQueries) {
      this.props.onAdd({ name: this.props.query })
    }
  }
  onFocus = () => {
    this.setState({
      queryPlaceholder: this.props.queryPlaceholder,
    })
  }
  onBlur = () => {
    this.setState({
      queryPlaceholder: this.props.noFocusQueryPlaceholder,
    })
  }
  render() {
    if (this.props.disabled) {
      return null
    }
    const {
      getSuggestions,
      style,
      isModal,
      inputRef,
      isInModal,
      onShowSuggestions,
      initialSuggestions,
      noResultsMessage,
      onlySuggestedQueries,
      onQueryChange,
      query,
      classes,
    } = this.props
    return (
      <Search
        className={classnames(this.props.className, classes.addTag)}
        role="form"
        style={style}
        getSuggestions={getSuggestions}
        onSubmit={this.onSubmit}
        onKeyDown={this.onKeyDown}
        onQueryChange={onQueryChange}
        query={query}
        isModal={isModal}
        inputRef={inputRef}
        lockBodyScroll={!isInModal}
        onShowSuggestions={onShowSuggestions}
        shouldClearOnBlur={!isInModal}
        initialSuggestions={initialSuggestions}
        onlySuggestedQueries={onlySuggestedQueries}
        noResultsMessage={noResultsMessage}
        placeholder={this.state.queryPlaceholder}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    )
  }
}

AddTag.defaultProps = {
  onlySuggestedQueries: true,
}

export default injectSheet(styles)(AddTag)
