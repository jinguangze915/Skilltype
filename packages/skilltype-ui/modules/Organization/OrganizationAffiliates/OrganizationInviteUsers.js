import React from 'react'
import injectSheet from 'react-jss'
import moment from 'moment'
import RaisedSection from '@skilltype/ui/components/Section/RaisedSection'
import Table from '@skilltype/ui/components/Table/Table'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import styles from '../styles'
import OrganizationInviteForm from './OrganizationInviteForm'

class OrganizationInviteUsers extends React.Component {
  state = {
    organizationId: '',
    query: '',
    users: [],
    queriedResults: [],
  }

  componentWillMount = () => {
    this.setState({
      organizationId: window.location.pathname.replace(/\D/g, ''),
    })
  }

  componentDidMount = () => {
    this.fetchData()
  }

  onQueryChange = ({ target: { value: query } }) => {
    this.setState({ query }, () => {
      this.setState({ queriedResults: this.state.users })
      const queriedResults = this.state.users.filter(user =>
        user.fullName.toLowerCase().includes(this.state.query)
      )
      this.setState({ queriedResults })
    })
  }

  resendInvite = e => {
    const { users } = this.state
    const user = users.find(item => item.sentTo === e[0])

    this.props.serviceContext.user
      .resendInvite(user.id)
      .then(() => {
        this.props.notify('Invite has been resent')
        this.props.notifyClose(2000)
        this.fetchData()
      })
      .catch(() => this.props.notifyError('Error Resending Invitation'))
  }

  revokeInvite = e => {
    const { users } = this.state
    const user = users.find(item => item.sentTo === e[0])

    this.props.serviceContext.user
      .revokeInvite(user.id)
      .then(() => {
        this.props.notify('Invite has been revoked')
        this.props.notifyClose(2000)
        this.fetchData()
      })
      .catch(() => this.props.notifyError('Error Resending Invitation'))
  }

  fetchData = () => {
    this.props.serviceContext.admin
      .inviteUsersOrganization(this.state.organizationId)
      .then(users => this.setState({ users, queriedResults: users }))
  }

  formatUsers = users =>
    users.map(user => [
      user.sentTo,
      moment(user.sentAt).format('MMM DD, YYYY [at] h:mm:ss a'),
      user.active,
    ])

  render() {
    const { classes } = this.props
    const { queriedResults, organizationId } = this.state

    return (
      <React.Fragment>
        <RaisedSection style={{ marginBottom: '0', borderBottom: 'none' }}>
          <OrganizationInviteForm
            organizationId={organizationId}
            reloadInvites={this.fetchData}
          />
        </RaisedSection>
        <RaisedSection style={{ maxHeight: '720px', marginTop: '0' }}>
          <Table
            style={{ width: '763px' }}
            data={this.formatUsers(queriedResults)}
            onUpdate={this.onUpdate}
            columns={[
              { name: 'Email' },
              { name: 'Sent' },
              {
                name: 'Role',
                options: {
                  customBodyRender: (value, updateValue, row) => (
                    <React.Fragment>
                      <button
                        className={classes.resendBtn}
                        onClick={() => this.resendInvite(row)}
                      >
                        Resend
                      </button>
                      <span> · </span>
                      <button
                        className={classes.revokeBtn}
                        onClick={() => this.revokeInvite(row)}
                      >
                        Revoke
                      </button>
                    </React.Fragment>
                  ),
                },
              },
            ]}
          />
        </RaisedSection>
      </React.Fragment>
    )
  }
}
export default injectSheet(styles)(
  withServiceContext(withNotifyContext(OrganizationInviteUsers))
)
