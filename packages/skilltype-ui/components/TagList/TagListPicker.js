import React from 'react'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import Color from 'color'
import RemovableTag from '../Tag/RemovableTag'
import EditableTagList from './EditableTagList'
import ListPicker from '../ListPicker/ListPicker'
import profileThemes from '../../shared-styles/profileThemes'
import styles from './styles'
import { isMobileOrMobileOs } from '../../lib/mediaQuery'

class TagListPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePickerIndex: -1,
      activeListIndex: -1,
      pickerInputActive: false,
    }
    this.listContainerRef = React.createRef()
    this.pickerInputRef = React.createRef()
    this.pickerListboxRef = React.createRef()
    this.isMobileOrMobileOs = isMobileOrMobileOs()
  }
  onListContainerRef = ref => {
    if (!this.listContainerRef.current && ref && this.props.focusOnMount) {
      ref.focus()
    }
    this.listContainerRef.current = ref
  }
  onQueryChange = query => {
    this.setState({
      activePickerIndex: -1,
    })
    if (this.props.onQueryChange) {
      this.props.onQueryChange(query)
    }
  }
  onRemove = (id, skipFocus) => {
    this.props.onChange(this.props.tagList.filter(tag => tag.id !== id))
    if (!skipFocus) {
      this.listContainerRef.current.focus()
    }
  }
  onActivePickerIndexChange = activePickerIndex =>
    this.setState({ activePickerIndex })
  onActiveListIndexChange = activeListIndex =>
    this.setState({ activeListIndex })
  onPickerInputFocus = () => this.setState({ pickerInputActive: true })
  onPickerClearInput = () => {
    this.onQueryChange('')
    this.setState({ pickerInputActive: false })
    if (this.isMobileOrMobileOs) {
      this.pickerListboxRef.current.focus()
    } else {
      this.pickerInputRef.current.focus()
    }
  }
  makeOnItemSelected = selected => (id, index) => {
    this.setState({ activePickerIndex: index, pickerInputActive: false })
    if (selected[id]) {
      // remove the tag
      this.onRemove(id, true)
    } else {
      // add the tag
      this.props.onChange(
        this.props.tagList.concat(this.props.suggestions[index])
      )
    }

    if (this.isMobileOrMobileOs) {
      this.pickerListboxRef.current.focus()
    }
  }
  makeOnRemove = id => () => this.onRemove(id)
  render() {
    const {
      className,
      suggestions,
      tagList,
      style,
      query,
      queryPlaceholder,
      classes,
      disabled,
      tagTheme,
      id,
      theme,
      noResultsMessage,
      noTagsMessage,
    } = this.props
    const selected = tagList.reduce(
      (dict, tag) => ({ ...dict, [tag.id]: true }),
      {}
    )
    const pt = profileThemes(theme).all
    return (
      <div
        className={classnames(className, classes.tagListPicker)}
        style={style}
      >
        <EditableTagList
          disabled={disabled}
          isEditable={!disabled}
          tagTheme={tagTheme}
          classes={classes}
          tagList={tagList}
          activeIndex={this.state.activeListIndex}
          onActiveIndexChange={this.onActiveListIndexChange}
          containerRef={this.onListContainerRef}
          onRemove={this.onRemove}
          id={`${id}-tagList`}
          aria-label="selected tags"
          className={classnames(classes.tagEditor, {
            [classes.hide]: this.state.pickerInputActive,
          })}
          noTagsMessage={noTagsMessage}
        >
          {tagList.map(tag => (
            <RemovableTag key={tag.id}>{tag.name}</RemovableTag>
          ))}
        </EditableTagList>
        <ListPicker
          id={`${id}-listPicker`}
          suggestions={suggestions}
          selected={selected}
          query={query}
          activeIndex={this.state.activePickerIndex}
          placeholder={queryPlaceholder}
          classes={classes}
          className={classnames(classes.comboBox, {
            [classes.inputActive]: this.state.pickerInputActive,
          })}
          isMultiSelect
          aria-label="browse and search tags"
          disabled={disabled}
          selectedColor={
            tagTheme
              ? Color(pt[tagTheme].backgroundColor)
                  .darken(0.5)
                  .saturate(1)
              : null
          }
          addMobileKeyboardPadding={
            this.isMobileOrMobileOs && this.state.pickerInputActive
          }
          isAlwaysCombo={!this.isMobileOrMobileOs}
          isCombo={!this.isMobileOrMobileOs || this.state.pickerInputActive}
          inputRef={this.pickerInputRef}
          listboxRef={this.pickerListboxRef}
          onInputFocus={this.onPickerInputFocus}
          onClearInput={this.onPickerClearInput}
          onItemSelected={this.makeOnItemSelected(selected)}
          onActiveIndexChange={this.onActivePickerIndexChange}
          onQueryChange={this.onQueryChange}
          noResultsMessage={
            <span className={classes.noTagsMessage}>{noResultsMessage}</span>
          }
        />
      </div>
    )
  }
}

TagListPicker.defaultProps = {
  id: 'tagListPicker',
}

export default injectSheet(styles)(TagListPicker)
