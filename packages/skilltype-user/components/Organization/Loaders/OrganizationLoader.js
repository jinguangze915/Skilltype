import React from 'react'
import { Redirect } from '@skilltype/ui/components/Router/Router'
import { withAwait } from '@skilltype/ui/components/Await/Await'
import { withOrganizationContext } from '../OrganizationProvider'
import Org from '../Organization'

const Organization = withAwait(Org)

/*
 * An OrganizationLoader is used when the user navigates directly to /organizations/:id/:page
 *
 * This means that we did not already load the organization list and the values are not saved in the OrganizationProvider
 *
 * So the organization is loaded by its :id
 */
class OrganizationLoader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organization: this.props.id
        ? this.props.organizationContext
            .fetchOrganization(this.props.id)
            .then(() =>
              this.setState({
                organization: this.props.organizationContext.organization,
              })
            )
        : null,
    }
  }

  render() {
    if (!this.props.id) {
      return <Redirect to="/organizations" />
    }
    return (
      <Organization organization={this.state.organization} {...this.props} />
    )
  }
}

export default withOrganizationContext(OrganizationLoader)
