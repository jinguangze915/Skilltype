import React from 'react'
import injectSheet from 'react-jss'
import scrollIntoView from 'scroll-into-view-if-needed'
import TagList from './TagList'
import AriaOnly from '../Viewport/AriaOnly'
import styles from './styles'

class EditableTagList extends React.Component {
  state = {
    hasFocus: false,
    status: '',
    // we keep track of this to handle the use case of focusing by
    //  clicking on the last tag in the list
    hadFocusOnLastClick: false,
  }
  componentDidUpdate(prevProps) {
    const { tagList, activeIndex } = this.props
    // check for tagList changes
    if (
      prevProps.tagList.length !== tagList.length &&
      activeIndex > tagList.length - 1
    ) {
      // active index has gone out of bounds, reset it
      this.onActiveIndexChange(tagList.length - 1)
    }
    if (tagList.length < prevProps.tagList.length) {
      // we've removed tag(s), so update maxIndex
      this.maxIndex = tagList.length - 1
    }
  }
  onFocus = () => {
    // we put this in a setTimeout to ensure that tag onClick will be handled
    //   first. Fixes the problem of always selecting the last tag, regardless
    //   of tag clicked.
    setTimeout(() => {
      const { tagList, activeIndex } = this.props
      if (activeIndex < 0) {
        this.onActiveIndexChange(tagList.length - 1)
      }
    }, 100)
    this.setState({ hasFocus: true })
  }
  onBlur = () => {
    this.setState({ hasFocus: false, hadFocusOnLastClick: false })
    this.onActiveIndexChange(-1)
  }
  onRemove = idx => {
    const tag = this.props.tagList[idx]
    if (tag && this.props.onRemove) {
      this.setState({ status: `you removed: ${tag.name}` })
      this.props.onRemove(tag.id)
    }
  }
  onKeyDown = e => {
    if (this.props.disabled) {
      return
    }
    switch (e.keyCode) {
      case 37:
      case 38: {
        // left arrow, up arrow
        this.advanceActiveIndex(-1)
        e.preventDefault()
        break
      }
      case 39:
      case 40: {
        // right arrow, down arrow
        this.advanceActiveIndex(1)
        e.preventDefault()
        break
      }
      default: {
        break
      }
    }
  }
  onKeyUp = e => {
    if (this.props.disabled) {
      return
    }
    switch (e.keyCode) {
      case 8:
      case 32: {
        // delete key, spacebar
        this.onRemove(this.props.activeIndex)
        e.preventDefault()
        break
      }
      default: {
        break
      }
    }
  }
  onActiveIndexChange = index => {
    if (this.props.onActiveIndexChange) {
      this.props.onActiveIndexChange(index)
    }
  }
  makeOnTagClick = index => () => {
    if (this.props.disabled) {
      return
    }
    this.setState({ hadFocusOnLastClick: true })
    this.onActiveIndexChange(index)
  }
  makeOnRemove = idx => () => this.onRemove(idx)
  makeTagRef = idx => e => {
    const { activeIndex } = this.props
    let tagAdded = false
    if (!this.maxIndex || idx > this.maxIndex) {
      this.maxIndex = idx
      tagAdded = true
    }
    if (e && (idx === activeIndex || tagAdded)) {
      scrollIntoView(e, { scrollMode: 'if-needed' })
    }
  }
  advanceActiveIndex = incrementBy => {
    const { activeIndex, tagList } = this.props
    let nextIndex = activeIndex + incrementBy
    if (nextIndex === tagList.length) {
      nextIndex = 0
    } else if (nextIndex < 0) {
      nextIndex = tagList.length - 1
    }
    this.onActiveIndexChange(nextIndex)
  }
  render() {
    const {
      tagList,
      children,
      activeIndex,
      id,
      disabled,
      ...others
    } = this.props
    const { hasFocus } = this.state
    return (
      <React.Fragment>
        <AriaOnly aria-live="assertive">{this.state.status}</AriaOnly>
        <AriaOnly id={`${id}-label`}>({others['aria-label']})</AriaOnly>
        <TagList
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          {...others}
          isEditable
          disabled={disabled}
          aria-activedescendant={
            tagList.length && tagList[activeIndex]
              ? `${id}.${tagList[activeIndex].id}`
              : null
          }
        >
          {React.Children.map(children, (child, idx) =>
            React.cloneElement(child, {
              id: `${id}.${tagList[idx].id}`,
              onClick:
                idx === activeIndex && this.state.hadFocusOnLastClick
                  ? this.makeOnRemove(idx)
                  : this.makeOnTagClick(idx),
              isActive: hasFocus && !disabled && activeIndex === idx,
              'aria-describedby': `${id}-label`,
              'aria-selected': idx === activeIndex,
              onRemove: this.makeOnRemove(idx),
              tagRef: this.makeTagRef(idx),
            })
          )}
        </TagList>
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(EditableTagList)
