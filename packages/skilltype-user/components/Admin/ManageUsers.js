import React from 'react'
import injectSheet from 'react-jss'
import RaisedSection from '@skilltype/ui/components/Section/RaisedSection'
import Table from '@skilltype/ui/components/Table/Table'
import Select from '@skilltype/ui/components/Select/Select'
import SearchSvg from '@skilltype/ui/assets/search.svg'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import styles from './styles'
import InviteUsersForm from './InviteUsersForm'

class ManageUsers extends React.Component {
  state = {
    query: '',
    users: [],
    queriedResults: [],
  }

  componentDidMount = () => {
    this.props.serviceContext.admin
      .getUsersWithRoles()
      .then(users => this.setState({ users, queriedResults: users }))
  }

  onUpdate = e => {
    const [, email, roleName] = e
    // HACK to find the event targets id
    const id = this.state.users.find(user => user.email === email).id
    this.props.serviceContext.admin
      .updateUserRole({ id, roleName })
      .then(() => this.props.notify('Role Successfully Updated'))
      .catch(() => this.props.notifyError('Error Updating Role'))
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

  formatUsers = users =>
    users.map(user => [user.fullName, user.email, user.role])

  render() {
    const { queriedResults } = this.state
    const roleOptions = [
      { label: 'User', value: 'ROLE_USER' },
      { label: 'Customer', value: 'ROLE_ADMIN' },
      { label: 'Admin', value: 'ROLE_SKILLTYPE_ADMIN' },
      { label: 'Revoke', value: null },
    ]
    return (
      <React.Fragment>
        <RaisedSection style={{ width: '774px' }}>
          <InviteUsersForm />
        </RaisedSection>
        <RaisedSection
          title={`Users (${this.state.users.length})`}
          style={{ width: '774px', height: '714px' }}
        >
          <div className={this.props.classes.inputContainer}>
            <SearchSvg className={this.props.classes.searchSvg} />
            <input
              type="text"
              disabled={false}
              className={this.props.classes.queryInput}
              placeholder="Search"
              value={this.state.query}
              onChange={this.onQueryChange}
              onFocus={this.onInputFocus}
              ref={this.onInputRef}
            />
          </div>
          <Table
            style={{ width: '763px' }}
            data={this.formatUsers(queriedResults)}
            onUpdate={this.onUpdate}
            columns={[
              { name: 'Name' },
              { name: 'Work Email' },
              {
                name: 'Role',
                options: {
                  customBodyRender: (value, updateValue, row, column) => (
                    <Select
                      id="role"
                      key={`${row}-${column}`}
                      clearable={false}
                      placeholder=""
                      options={roleOptions}
                      value={value}
                      onChange={event => updateValue(event.target.value)}
                      style={{
                        fontSize: 'initial',
                        marginBottom: '-0.3em',
                      }}
                      inputProps={{
                        menuPortalTarget: document.getElementById('root'),
                      }}
                    />
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
  withServiceContext(withNotifyContext(ManageUsers))
)
