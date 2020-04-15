import React from 'react'
import { profileTagGroups } from '@skilltype/data'
import Profile from '@skilltype/ui/modules/Profile/Profile'
import Modal from '@skilltype/ui/components/Modal/Modal'
import Progress from '@skilltype/ui/components/Progress/Progress'
import TagListPicker from '@skilltype/ui/components/TagList/TagListPicker'
import { prefixSearch, getExcluding } from '@skilltype/services/lib/suggestions'
import RequestAffiliationModal from './RequestAffiliationModal'

const { getTagGroups, suggestionsByType } = profileTagGroups

class ProfileRouter extends React.Component {
  constructor(props) {
    super(props)
    this.tagGroups = getTagGroups(props.profileData, props.profileMeta)
  }
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
      this.tagGroups = getTagGroups(
        this.props.profileData,
        this.props.profileMeta
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
      suggestionsByType[tagGroup.suggestionsType],
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
  render() {
    const { editGroupKey } = this.state
    const tagGroup = editGroupKey && this.tagGroups[editGroupKey]
    const { isSaving, affiliationPermissions } = this.props

    return (
      <React.Fragment>
        <Profile
          tagGroups={this.tagGroups}
          onEditTagGroup={this.onEditTagGroup}
        />
        {editGroupKey === 'affiliations' && (
          <RequestAffiliationModal
            permissionsContent={affiliationPermissions}
            onDismiss={this.onModalDismiss}
          />
        )}
        {tagGroup &&
          editGroupKey !== 'affiliations' && (
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

export default ProfileRouter
