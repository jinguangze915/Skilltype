import React from 'react'
import { bool, func, arrayOf, shape } from 'prop-types'
import ResourceListHead from '../../components/Library/ResourceListHead'
import ResourceList from '../../components/Library/ResourceList'
import ResourceListItem from '../../components/Library/ResourceListItem'
import ResourceItem from '../../components/Library/ResourceItem'
import ResourceItemMenu from '../../components/Library/ResourceItemMenu'
import ResourceInfo from '../../components/Library/ResourceInfo'
import TagList from '../../components/TagList/TagList'
import Tag from '../../components/Tag/Tag'

class ResourceView extends React.Component {
  static propTypes = {
    showSave: bool,
    onAddClick: func,
    resourceList: arrayOf(shape({})),
  }
  state = {
    // dict of url => bool
    infoIsVisible: {},
  }
  makeOnNavigate = url => () => {
    if (this.props.onNavigate) {
      this.props.onNavigate(url)
    }
  }
  makeOnSave = url => () => {
    if (this.props.onSave) {
      this.props.onSave(url)
    }
  }
  makeOnToggleInfo = url => () => {
    const { infoIsVisible } = this.state
    infoIsVisible[url] = !infoIsVisible[url]
    this.setState({ infoIsVisible })
  }
  render() {
    const { resourceList, showSave, onAddClick } = this.props
    return (
      <React.Fragment>
        <ResourceListHead
          resourceCount={resourceList.length}
          onAddClick={onAddClick}
        />
        <ResourceList>
          {resourceList.map((res, idx) => (
            <ResourceListItem key={idx}>
              <ResourceItem {...res} onNavigate={this.makeOnNavigate(res.url)}>
                {(showSave || res.info) && (
                  <ResourceItemMenu
                    onSaveClick={showSave && this.makeOnSave(res.url)}
                    onInfoClick={res.info && this.makeOnToggleInfo(res.url)}
                    isSaved={res.isSaved}
                    infoIsVisible={this.state.infoIsVisible[res.url]}
                  />
                )}
              </ResourceItem>
              {this.state.infoIsVisible[res.url] && (
                <ResourceInfo>
                  {res.info}
                  {res.tags && (
                    <TagList style={{ marginTop: '1em' }}>
                      {res.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
                    </TagList>
                  )}
                </ResourceInfo>
              )}
            </ResourceListItem>
          ))}
        </ResourceList>
      </React.Fragment>
    )
  }
}

ResourceView.defaultProps = {
  showSave: true,
}

export default ResourceView
