import React from 'react'
import { storiesOf } from '@storybook/react'
import fullResourceList from '@skilltype/data/data/resources.json'
import { profileTagGroups } from '@skilltype/data'
import { prefixSearch } from '@skilltype/services/lib/suggestions'
import moment from 'moment'
import ResourceViewFallback from '../../modules/Library/ResourceViewFallback'
import ResourceView from '../../modules/Library/ResourceView'
import AddResource from '../../modules/Library/AddResource'
import TagResource from '../../modules/Library/TagResource'
import Modal from '../../components/Modal/Modal'
import { ViewportDecorator, ModalDecorator } from '../decorators'
import { resourceList } from '../data/resourceList.data'
import { domainFromUrl } from '../../lib/url'

const { suggestionsByType } = profileTagGroups
const FIXED_RELATIVE_DATE = '2019-04-01'

class ResourceViewWithSave extends React.Component {
  state = {
    showModal: false,
  }
  dismissModal = () => {
    this.setState({ showModal: false })
  }
  render() {
    return (
      <React.Fragment>
        <ResourceView
          onSave={url => {
            this.setState({ [url]: !this.state || !this.state[url] })
          }}
          onAddClick={() => this.setState({ showModal: true })}
          resourceList={fullResourceList.map(r => ({
            resourceType: r.MEDIA_TYPE,
            title: r.NAME,
            publishedOn: moment(r.PUBLICATION_DATE).from(FIXED_RELATIVE_DATE),
            url: r.SOURCE,
            source: domainFromUrl(new URL(r.SOURCE).hostname),
            info: r.MORE_INFO,
            isSaved: this.state && this.state[r.SOURCE],
            tags: r.TAGS && r.TAGS.split(';').map(t => t.trim()),
          }))}
          onNavigate={url => window.open(url)}
        />
        {this.state.showModal && (
          <AddResourceModal
            onOk={this.dismissModal}
            onDismiss={this.dismissModal}
          />
        )}
      </React.Fragment>
    )
  }
}

class AddResourceRouter extends React.Component {
  state = {
    values: {},
  }
  render() {
    return (
      <AddResource
        onChange={({ values }) => {
          // console.log(values)
          this.setState({ values })
        }}
        values={this.state.values}
      />
    )
  }
}

class TagResourceRouter extends React.Component {
  state = {
    tagList: [],
    suggestions: suggestionsByType.skills,
    query: '',
  }
  render() {
    return (
      <TagResource
        tagList={this.state.tagList}
        querySuggestions={this.state.suggestions}
        query={this.state.query}
        onChange={tagList => this.setState({ tagList })}
        onQueryChange={query =>
          this.setState({
            query,
            suggestions: prefixSearch(suggestionsByType.skills, query),
          })
        }
      />
    )
  }
}

class AddResourceModal extends React.Component {
  state = {
    step: 0,
  }
  render() {
    const { onOk, onDismiss } = this.props
    return (
      <Modal
        title="Add Resource"
        showOkButton
        okButtonLabel={this.state.step ? 'Add' : 'Next'}
        showCancelButton
        cancelButtonLabel={this.state.step ? 'Back' : 'Cancel'}
        showCloseButton
        lockBodyScroll
        hasEditableContent
        contentHandlesScroll={this.state.step}
        onOk={
          this.state.step
            ? () => onOk()
            : () => {
                this.setState({ step: 1 })
              }
        }
        onDismiss={onDismiss}
        onCancel={
          this.state.step
            ? () => {
                this.setState({ step: 0 })
              }
            : () => onDismiss()
        }
        appElementId="root"
      >
        {this.state.step ? <TagResourceRouter /> : <AddResourceRouter />}
      </Modal>
    )
  }
}

// Resources
storiesOf('Modules//Library//Resource View', module)
  .addDecorator(ViewportDecorator)
  .add('loading fallback', () => <ResourceViewFallback />)
  .add('default', () => (
    <ResourceView
      resourceList={resourceList}
      onNavigate={url => console.log(`onNavigate: ${url}`)}
      onSave={url => console.log(`onSave: ${url}`)}
    />
  ))

storiesOf('Modules//Library//Add Resource', module)
  .addDecorator(ModalDecorator)
  .add('add resource', () => <AddResourceRouter />)
  .add('tag resource', () => <TagResourceRouter />)

storiesOf('Demos//Library//Resource View', module)
  .addDecorator(ViewportDecorator)
  .add('default', () => <ResourceViewWithSave />)
