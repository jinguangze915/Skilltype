import React from 'react'
import Progress from '@skilltype/ui/components/Progress/Progress'
import OrgList from '@skilltype/ui/modules/Organization/OrganizationList'
import OrgListFallback from '@skilltype/ui/modules/Organization/OrganizationListFallback'
import {
  withLocationContext,
  pathFromUri,
} from '@skilltype/ui/components/Router/Router'
import Header from '../App/Header'
import Body from '../App/Body'
import { withOrganizationContext } from './OrganizationProvider'
import {
  withUserContext,
  userIsRoleAdmin,
  userIsRoleSkilltypeAdmin,
  userIsRoleOrgAdmin,
} from '../User/UserProvider'

const capitalize = str =>
  typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : ''

// ProfileCard expects different prop names
const renameOrgProps = org =>
  org
    ? {
        id: org.id,
        name: org.fullName,
        tagline: capitalize(org.type),
        location: org.location,
        profileTheme: org.cardColor,
        avatarLabel: org.shortName,
      }
    : null

class OrganizationList extends React.Component {
  componentDidMount() {
    const { organizationContext } = this.props
    if (
      organizationContext &&
      !organizationContext.organizations &&
      !organizationContext.isPending &&
      organizationContext.fetchUserOrganizations
    ) {
      organizationContext.fetchUserOrganizations()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location &&
      this.props.location &&
      this.props.location.state &&
      prevProps.location.state &&
      this.props.location.state.reload !== prevProps.location.state.reload &&
      this.props.location.state.reload === true
    ) {
      const { organizationContext } = this.props
      if (organizationContext && organizationContext.fetchUserOrganizations) {
        organizationContext.fetchUserOrganizations()
      }
    }
  }

  onNavigate = e => this.props.navigate(pathFromUri(e.target.href))
  showModal = () => this.props.navigate('/organizations/create')

  render() {
    const { userContext, organizationContext } = this.props
    const orgs =
      organizationContext && organizationContext.organizations
        ? organizationContext.organizations
        : []
    const organizations = orgs.map(renameOrgProps).filter(Boolean)
    const showAdd =
      userIsRoleAdmin(userContext.user) ||
      userIsRoleSkilltypeAdmin(userContext.user) ||
      userIsRoleOrgAdmin(userContext.user)
    const { isPending } = organizationContext
    return (
      <React.Fragment>
        <Header title="Organizations" />
        <Body userData={userContext.user}>
          {isPending && <Progress />}
          {!isPending && showAdd ? (
            <OrgList
              showAdd={showAdd}
              organizations={organizations}
              onAdd={this.showModal}
              onNavigate={this.onNavigate}
            />
          ) : (
            !isPending &&
            !showAdd &&
            !organizations.length && <OrgListFallback />
          )}
          {this.props.children}
        </Body>
      </React.Fragment>
    )
  }
}

export default withUserContext(
  withOrganizationContext(withLocationContext(OrganizationList))
)
