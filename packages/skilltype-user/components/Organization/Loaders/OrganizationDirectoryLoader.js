import React from 'react'
import { string } from 'prop-types'
import { withAwait } from '@skilltype/ui/components/Await/Await'
import Affiliates from '@skilltype/ui/modules/Organization/OrganizationAffiliates'
import { withOrganizationContext } from '../OrganizationProvider'

// TODO @jacob: Create affilaites fallback table
const OrganizationAffiliates = withAwait(Affiliates)

// TODO @jacob: Enable loader when affiliates endpoints are deployed
// TODO @jacob: Provide onUpdate callback function for affiliation status changing

class OrganizationDirectoryLoader extends React.Component {
  static propTypes = {
    id: string.isRequired,
  }

  /*
   * OrganizationDirectoryLoader depends on the affiliates relation to the current organization (by id)
   */
  constructor(props) {
    super(props)
    this.state = {
      organizationAffiliates: this.props.organizationContext
        .fetchOrganizationAffiliates(this.props.id)
        .then(() =>
          this.setState({
            organizationAffiliates: this.props.organizationContext
              .organizationAffiliates,
          })
        ),
    }
  }

  render() {
    const { organizationContext, ...restProps } = this.props
    const { isPending, organizationAffiliates } = organizationContext
    // Need to prefer using the organizationContext value for profile over
    // state since it will be most up to date after subsequent updates
    const affiliates =
      !isPending && organizationAffiliates
        ? organizationAffiliates
        : this.state.organizationAffiliates

    return (
      <OrganizationAffiliates
        affiliates={affiliates}
        onUpdate={() => {}}
        {...restProps}
      />
    )
  }
}

export default withOrganizationContext(OrganizationDirectoryLoader)
