import React from 'react'
import injectSheet from 'react-jss'
import moment from 'moment'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import RaisedSection from '@skilltype/ui/components/Section/RaisedSection'
import Table from '@skilltype/ui/components/Table/Table'
import styles from './styles'
import AddResourceForm from './AddResourceForm'

class ManageResources extends React.Component {
  state = {
    resources: [],
  }

  componentDidMount = () => {
    this.fetchData()
  }

  fetchData = () => {
    this.props.serviceContext.resource
      .getReportedResource()
      .then(resources => this.setState({ resources }))
  }

  formatResources = resources =>
    resources.map(resource => [
      resource.resourceURL,
      resource.reportedBy,
      moment(resource.reportedAt).fromNow(),
      resource.id,
    ])

  replyToResource = id => {
    console.log(id)
  }

  removeFromReportList = id => {
    this.props.serviceContext.resource
      .removeFromReportList(id)
      .then(() => {
        this.props.notify('Resource has been removed from reported list.')
        this.props.notifyClose(2000)
        this.fetchData()
      })
      .catch(() => {
        this.props.notifyError('Error Resending Invitation')
        this.props.notifyClose(2000)
      })
  }

  render() {
    const { classes } = this.props
    const { resources } = this.state

    return (
      <React.Fragment>
        <RaisedSection>
          <AddResourceForm />
        </RaisedSection>
        <RaisedSection title="Reported Items">
          <div className={classes.reportedTable}>
            <Table
              style={{ width: '763px' }}
              data={this.formatResources(resources)}
              onUpdate={this.onUpdate}
              columns={[
                { name: 'URL' },
                { name: 'Submitted By' },
                { name: 'Timestamp' },
                {
                  name: '',
                  options: {
                    customBodyRender: value => (
                      <div className={classes.showOnHover}>
                        <button
                          className={classes.btnPrimary}
                          onClick={() => this.replyToResource(value)}
                        >
                          Reply
                        </button>
                        <span>·</span>
                        <button
                          className={classes.btnDanger}
                          onClick={() => this.removeFromReportList(value)}
                        >
                          Remove
                        </button>
                      </div>
                    ),
                  },
                },
              ]}
            />
          </div>
        </RaisedSection>
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(
  withServiceContext(withNotifyContext(ManageResources))
)
