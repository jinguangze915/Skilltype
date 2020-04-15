import React from 'react'
import { profileTagGroups } from '@skilltype/data'
import { prefixSearch } from '@skilltype/services/lib/suggestions'
import moment from 'moment'
import ResourceView from '@skilltype/ui/modules/Library/ResourceView'
import AddResource from '@skilltype/ui/modules/Library/AddResource'
import TagResource from '@skilltype/ui/modules/Library/TagResource'
import Progress from '@skilltype/ui/components/Progress/Progress'
import Modal from '@skilltype/ui/components/Modal/Modal'
import { domainFromUrl } from '@skilltype/ui/lib/url'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'

const {
  suggestionsByType: { skills },
} = profileTagGroups

class ResourceViewWithSave extends React.Component {
  state = {
    showModal: false,
    resources: [],
    isLoading: false,
  }

  componentDidMount(): void {
    this.fetchData()
  }

  componentWillUnmount(): void {
    if (this.onScroll) {
      window.removeEventListener('scroll', this.onScroll)
      this.onScroll = null
    }
  }

  onScroll = null
  page = 0

  fetchData = () => {
    const { serviceContext, notifyError, notifyClose } = this.props
    let { resources } = this.state

    this.setState({
      isLoading: true,
    })
    serviceContext.resource
      .getFeeds(this.page)
      .then(res => {
        this.page += 1
        resources = resources.concat(
          res.content.map(item => ({
            resourceType: item.mediaType,
            title: item.displayName,
            publishedOn: moment(item.publicationDate).fromNow(),
            url: item.sourceUrl,
            source: domainFromUrl(new URL(item.sourceUrl).hostname),
            info: null,
            tags: [],
            publishedDate: moment(item.publicationDate),
          }))
        )
        this.setState({ resources, isLoading: false }, () => {
          if (!res.last) {
            if (!this.onScroll) {
              this.onScroll = () => {
                if (this.state.isLoading) return

                if (
                  window.pageYOffset + window.innerHeight >=
                  document.body.scrollHeight - 100
                ) {
                  this.fetchData()
                }
              }
              window.addEventListener('scroll', this.onScroll)
            }
          } else if (this.onScroll) {
            window.removeEventListener('scroll', this.onScroll)
            this.onScroll = null
          }
        })
      })
      .catch(err => {
        console.error(err)
        notifyError('Failed get feeds.')
        notifyClose(2000)
      })
  }
  dismissModal = () => {
    this.setState({ showModal: false })
  }
  render() {
    const { resources } = this.state

    return (
      <React.Fragment>
        {this.state.isLoading && <Progress />}
        <ResourceView
          onSave={url => {
            this.setState({ [url]: !this.state || !this.state[url] })
          }}
          onAddClick={() => this.setState({ showModal: true })}
          resourceList={resources.map(r => ({
            ...r,
            isSaved: this.state && this.state[r.url],
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
    suggestions: skills,
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
            suggestions: prefixSearch(skills, query),
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

export default withNotifyContext(withServiceContext(ResourceViewWithSave))
