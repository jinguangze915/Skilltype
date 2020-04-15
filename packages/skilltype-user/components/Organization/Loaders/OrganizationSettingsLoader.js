import React from 'react'
import { string } from 'prop-types'
import { withAwait } from '@skilltype/ui/components/Await/Await'
import Settings from '@skilltype/ui/modules/Organization/OrganizationSettings'
import OrganizationSettingsFallback from '@skilltype/ui/modules/Organization/OrganizationSettingsFallback'
import { withOrganizationContext } from '../OrganizationProvider'

const OrganizationSettings = withAwait(Settings, OrganizationSettingsFallback)

class OrganizationSettingsLoader extends React.Component {
  static propTypes = {
    id: string.isRequired,
  }

  /*
   * OrganizationSettings depends only on the organization data (not profile or affiliations)
   *
   * The OrganizationProvider will cache the organziation's data, so if the
   * value has already been fetched, the promise will resolve immediately
   */
  constructor(props) {
    super(props)
    this.state = {
      organization: this.props.organizationContext
        .fetchOrganizationProfile(props.id)
        .then(() =>
          this.setState({
            organization: this.props.organizationContext.organization,
          })
        ),
    }
  }
  render() {
    const { id, organizationContext, ...restProps } = this.props
    const {
      isPending,
      organization: org,
      saveOrganization,
    } = organizationContext
    const organization = !isPending && org ? org : this.state.organization
    return (
      <OrganizationSettings
        organization={organization}
        saveOrganization={values => saveOrganization(id, values)}
        {...restProps}
      />
    )
  }
}

export default withOrganizationContext(OrganizationSettingsLoader)
