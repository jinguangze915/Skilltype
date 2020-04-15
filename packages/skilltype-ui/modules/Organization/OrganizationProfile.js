import React from 'react'
import Modal from '@skilltype/ui/components/Modal/Modal'
import Progress from '@skilltype/ui/components/Progress/Progress'
import TagListPicker from '@skilltype/ui/components/TagList/TagListPicker'
import ProfileSection from '@skilltype/ui/components/ProfileSection/ProfileSection'
import InstructionSection from '@skilltype/ui/components/Section/InstructionSection'
import TagList from '@skilltype/ui/components/TagList/TagList'
import Tag from '@skilltype/ui/components/Tag/Tag'
import { alphabetizeTagList } from '@skilltype/ui/lib/tags'
import { prefixSearch, getExcluding } from '@skilltype/services/lib/suggestions'
import organizationMeta from '@skilltype/data/data/organization-profile-sections.json'

const ProfileSections = ({ tagGroups, onEditTagGroup, adminMode }) =>
  Object.keys(tagGroups).map(groupKey => (
    <ProfileSection
      title={tagGroups[groupKey].title}
      key={groupKey}
      canEdit={adminMode ? tagGroups[groupKey].canEdit : false}
      onEdit={() => onEditTagGroup(groupKey)}
    >
      {tagGroups[groupKey].tags.length ? (
        <TagList tagTheme="white">
          {alphabetizeTagList(tagGroups[groupKey].tags).map(tag => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </TagList>
      ) : (
        <InstructionSection>
          {tagGroups[groupKey].placeholder}
        </InstructionSection>
      )}
    </ProfileSection>
  ))

class Profile extends React.Component {
  static propTypes = {}
  state = {
    editGroupKey: null,
    editedTagList: [],
    suggestions: [],
    querySuggestions: [],
    query: '',
  }
  onModalOk = () => {
    const values = Object.keys(this.tagGroups).reduce((dict, key) => {
      if (key === this.state.editGroupKey) {
        dict[key] = this.state.editedTagList.map(tag => tag.name)
        return dict
      }
      dict[key] = this.tagGroups[key].tags.map(tag => tag.name)
      return dict
    }, {})
    this.props.saveProfile(values).then(success => {
      if (!success) {
        return
      }
      this.tagGroups = this.props.getTagGroups(
        this.props.organizationProfile,
        organizationMeta
      )
      this.setState({
        editGroupKey: null,
      })
    })
  }
  onModalDismiss = () => {
    this.setState({
      editGroupKey: null,
      editedTagList: [],
    })
  }
  onTagListChange = editedTagList => {
    this.setState({
      editedTagList,
    })
  }
  onEditTagGroup = groupKey => {
    const tagGroup = this.tagGroups[groupKey]
    const suggestions = getExcluding(
      this.props.suggestionsByType[tagGroup.suggestionsType],
      Object.keys(this.tagGroups).reduce(
        (list, key) =>
          groupKey === key ? list : list.concat(this.tagGroups[key].tags),
        []
      )
    )
    this.setState({
      editGroupKey: groupKey,
      editedTagList: tagGroup.tags,
      querySuggestions: suggestions,
      query: '',
      suggestions,
    })
  }
  onTagQueryChange = query => {
    this.setState({
      query,
      querySuggestions: prefixSearch(this.state.suggestions, query),
    })
  }
  tagGroups = this.props.getTagGroups(
    this.props.organizationProfile,
    organizationMeta
  )

  render() {
    const { adminMode, isSaving } = this.props
    const tagGroup =
      this.state.editGroupKey && this.tagGroups[this.state.editGroupKey]
    return (
      <React.Fragment>
        <ProfileSections
          adminMode={adminMode}
          tagGroups={this.tagGroups}
          onEditTagGroup={this.onEditTagGroup}
        />
        {tagGroup && (
          <Modal
            title={`Edit ${tagGroup.title}`}
            appElementId="root"
            okButtonLabel="Update"
            onOk={this.onModalOk}
            onDismiss={this.onModalDismiss}
            okIsEnabled={!isSaving}
            cancelIsEnabled={!isSaving}
            shouldCloseOnEsc
            lockBodyScroll
            showCancelButton
            showOkButton
            showCloseButton
            hasEditableContent
            contentHandlesScroll
            wide
          >
            {isSaving && <Progress />}
            <TagListPicker
              id="profileTagListPicker"
              tagList={this.state.editedTagList}
              onChange={this.onTagListChange}
              suggestions={this.state.querySuggestions}
              query={this.state.query}
              onQueryChange={this.onTagQueryChange}
              queryPlaceholder={tagGroup.searchPlaceholder}
              noResultsMessage={
                <React.Fragment>
                  {tagGroup.noResults.message}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={tagGroup.noResults.suggest.url}
                  >
                    {tagGroup.noResults.suggest.message}
                  </a>
                </React.Fragment>
              }
              noTagsMessage={tagGroup.noTags.message}
              disabled={isSaving}
              style={{ flexGrow: 1 }}
              focusOnMount
            />
          </Modal>
        )}
      </React.Fragment>
    )
  }
}

export default Profile
