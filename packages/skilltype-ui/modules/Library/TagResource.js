import React from 'react'
import TagListPicker from '@skilltype/ui/components/TagList/TagListPicker'

const TagResources = ({
  tagList,
  query,
  querySuggestions,
  disabled,
  onChange,
  onQueryChange,
}) => (
  <TagListPicker
    id="tagResourcesListPicker"
    tagList={tagList}
    onChange={onChange}
    suggestions={querySuggestions}
    query={query}
    onQueryChange={onQueryChange}
    queryPlaceholder="Search topics..."
    noResultsMessage="no topics found"
    noTagsMessage="no topics yet"
    disabled={disabled}
    style={{ flexGrow: 1 }}
  />
)

export default TagResources
