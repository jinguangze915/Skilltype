import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import RemovableTag from '../Tag/RemovableTag'
import TagList from './TagList'
import AddTag from '../Tag/AddTag'
import styles from './styles'

class EditTagList extends React.Component {
  state = {
    inputRef: null,
    containerRef: null,
  }
  onAdd = tag => {
    const tagList = [...this.props.tagList, tag]
    if (this.props.onChange) {
      this.props.onChange(tagList)
    }
    this.scrollInputIntoView()
  }

  onDelete = () => {
    const { tagList } = this.props
    if (tagList.length) {
      this.props.onChange(tagList.slice(0, tagList.length - 1))
    }
  }

  onClick = () => {
    if (!this.didFirstScroll) {
      return
    }
    this.state.inputRef.scrollIntoView()
    this.scrollInputIntoView()
  }

  onRemove = id => () => {
    this.props.onChange(this.props.tagList.filter(tag => tag.id !== id))
  }

  setContainerRef = e => {
    if (this.props.tagListRef) {
      this.props.tagListRef(e)
    }
    if (!this.state.containerRef) {
      this.setState({ containerRef: e })
    }
  }

  setInputRef = e => {
    if (!this.state.inputRef) {
      this.setState({ inputRef: e })
    }
  }

  scrollInputIntoView = () => {
    const { inputRef, containerRef } = this.state
    const { isInModal, scrollContainerRef } = this.props
    if (isInModal && scrollContainerRef && inputRef && containerRef) {
      const rect = containerRef.getBoundingClientRect()
      let offset = rect.bottom
      if (!this.didFirstScroll) {
        inputRef.scrollIntoView()
        offset = 0
        this.didFirstScroll = true
      }
      scrollContainerRef.scrollTop -= 200 - offset
    }
  }

  render() {
    const {
      className,
      getSuggestions,
      tagList,
      style,
      addIsModal,
      isInModal,
      onShowSuggestions,
      initialSuggestions,
      noResultsMessage,
      onQueryChange,
      query,
      queryPlaceholder,
      noFocusQueryPlaceholder,
      classes,
      focusOnMount,
      disabled,
      tagTheme,
    } = this.props
    if (!this.didFirstScroll) {
      if (this.state.inputRef && focusOnMount) {
        this.state.inputRef.focus()
      }
      this.scrollInputIntoView()
    }
    return (
      <TagList
        className={classnames(className, classes.editTagList, {
          [classes.inModal]: isInModal,
        })}
        style={style}
        containerRef={this.setContainerRef}
        onFocus={this.onClick}
        disabled={disabled}
        isEditable={!disabled}
        tagTheme={tagTheme}
      >
        {tagList.map(tag => (
          <RemovableTag onRemove={this.onRemove(tag.id)} key={tag.id}>
            {tag.name}
          </RemovableTag>
        ))}
        <AddTag
          getSuggestions={getSuggestions}
          onShowSuggestions={onShowSuggestions}
          onAdd={this.onAdd}
          onDelete={this.onDelete}
          isModal={addIsModal}
          isInModal={isInModal}
          inputRef={this.setInputRef}
          initialSuggestions={initialSuggestions}
          noResultsMessage={noResultsMessage}
          onQueryChange={onQueryChange}
          query={query}
          queryPlaceholder={queryPlaceholder}
          noFocusQueryPlaceholder={noFocusQueryPlaceholder}
        />
      </TagList>
    )
  }
}

EditTagList.defaultProps = {
  tagTheme: 'sunshine',
}

export default injectSheet(styles)(EditTagList)
