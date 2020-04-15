/* eslint-disable
  import/first,
  react/no-find-dom-node,
  react/default-props-match-prop-types,
  consistent-return
*/
import React from 'react'
import injectSheet from 'react-jss'
import { findDOMNode } from 'react-dom'
import RaisedSection from '@skilltype/ui/components/Section/RaisedSection'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import Table from '@skilltype/ui/components/Table/Table'
import Select from '@skilltype/ui/components/Select/Select'
import styles from '../styles'
import { withStyles } from '@material-ui/core/styles'
import { getOrganizationAffiliates } from '@skilltype/services/organization'
import OrganizationInviteUsers from './OrganizationInviteUsers'

// We can inject some CSS into the DOM.
const tableStyle = {
  root: {
    '& > thead > tr >  th:first-child': {
      display: 'none',
    },
    '& > tbody > tr >  td:first-child': {
      display: 'none',
    },
  },
}

const selectStyles = props => {
  const { theme } = props
  return {
    container: () => ({
      fontSize: 'initial',
      marginBottom: '-0.3em',
      marginLeft: '-0.6em',
    }),
    control: () => ({
      fontSize: theme.fontSizeNormal,
      backgroundColor: 'none',
      border: 'none',
      '&:hover': {
        border: 'none',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menuPortal: styles => ({
      ...styles,
      zIndex: theme.zIndex.modal,
    }),
    option: () => ({
      fontSize: theme.fontSizeNormal,
    }),
  }
}

class Affiliates extends React.Component {
  static defaultProps = {
    onUpdate: () => {},
  }

  state = {
    menuPortalTarget: null,
    isPending: false,
    organizationId: '',
    affiliationId: '',
    role: '',
  }

  // Select components will render their dropdown menus **behind** the parent
  // if overflowY: scroll is set, which in this case it is. To get around this,
  // we tell Select to use the wrapping parent component as the relative
  // mounting point via menuPortalTarget
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      // eslint-disable-next-line react/no-find-dom-node
      organizationId: this.props.id,
      menuPortalTarget: findDOMNode(this),
    })
  }

  onUpdate = async () => {
    if (this.state.isPending) return false
    this.setState({ isPending: true })

    const successMessage = 'Role updated.'
    const errorMessage = "Owner's role cannot be changed"

    const affiliateRelationshipDTO = {
      reason: 'Mensagem',
      relationship: this.state.role,
    }

    try {
      await this.props.serviceContext.organization.updateAffiliateRelationShip(
        this.state.organizationId,
        this.state.affiliationId,
        affiliateRelationshipDTO.reason,
        affiliateRelationshipDTO.relationship
      )
      this.setState({ isPending: false })
      this.props.notify(successMessage)
      return true
    } catch (error) {
      this.setState({ isPending: false })
      this.props.notifyError(errorMessage)
      return false
    }
  }

  setDadosUpdate = async e => {
    try {
      const [id, , role, status] = e

      if (!(status === 'Active')) return

      const affiliations = await getOrganizationAffiliates(
        this.state.organizationId
      )
      affiliations.map(a => {
        if (id === a.id) {
          if (a.owner) {
            this.props.notify("Owner's role cannot be changed")
            return a
          }
          this.setState({ affiliationId: a.id, role: role.toUpperCase() })
        }
        return a
      })
    } catch (err) {
      console.error(err)
      return
    } finally {
      this.onUpdate()
    }
  }

  render() {
    const { affiliates, theme, classes } = this.props
    const { menuPortalTarget } = this.state

    const roleOptions = [
      { label: 'Manager', value: 'MANAGER' },
      { label: 'Staff', value: 'STAFF' },
      { label: 'Follower', value: 'FOLLOWER' },
    ]
    return (
      <React.Fragment>
        <RaisedSection
          title={`Affiliates ${affiliates ? `(${affiliates.length})` : ``}`}
        >
          <Table
            classes={{ root: classes.root }}
            data={affiliates}
            onUpdate={this.setDadosUpdate}
            maxHeight="100%"
            columns={[
              { name: 'Id' },
              { name: 'Name' },
              {
                name: 'Role',
                options: {
                  customBodyRender: (value, updateValue, row, column) => (
                    <Select
                      id="role"
                      key={`TableCell-Select-${row}-${column}`}
                      clearable={false}
                      searchable={false}
                      placeholder=""
                      options={roleOptions}
                      value={value}
                      onChange={event => updateValue(event.target.value)}
                      stylesOverrides={selectStyles}
                      inputProps={{
                        menuPortalTarget,
                      }}
                    />
                  ),
                },
              },
              {
                name: 'Status',
                options: {
                  customBodyRender: value => {
                    const status = value.toLowerCase()
                    const colorMapping = {
                      active: theme.green,
                      inactive: theme.darkRed,
                      pending: theme.yellow,
                    }
                    const color = colorMapping[status] || theme.black
                    return <div style={{ color }}>{value}</div>
                  },
                },
              },
            ]}
          />
        </RaisedSection>
        <OrganizationInviteUsers />
      </React.Fragment>
    )
  }
}

/* eslint-disable*/
export default withStyles(tableStyle)(
  injectSheet(styles)(withServiceContext(withNotifyContext(Affiliates))))

