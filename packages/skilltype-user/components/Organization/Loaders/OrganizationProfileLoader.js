import React from 'react'
import { string } from 'prop-types'
import { withAwait } from '@skilltype/ui/components/Await/Await'
import Profile from '@skilltype/ui/modules/Organization/OrganizationProfile'
import ProfileFallback from '@skilltype/ui/modules/Organization/OrganizationProfileFallback'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import organizationMeta from '@skilltype/data/data/profile-sections.json'
import { withOrganizationContext } from '../OrganizationProvider'

const OrganizationProfile = withAwait(Profile, ProfileFallback)

class OrganizationProfileLoader extends React.Component {
  static propTypes = {
    id: string.isRequired,
  }
  /*
   * OrganizationProfile depends on two pieces of dynamic data:
   * 1. `organizationProfile` (memberships, strategicDirections, productsAndServices)
   * 2. `organizationMeta` (UX copy for empty, search, and no result text)
   */
  constructor(props) {
    super(props)
    this.state = {
      organizationMeta,
      organizationProfile: this.props.organizationContext
        .fetchOrganizationProfile(props.id)
        .then(() =>
          this.setState({
            organizationProfile: this.props.organizationContext
              .organizationProfile,
          })
        ),
    }
  }

  render() {
    const { organizationContext, ...restProps } = this.props
    const {
      isPending,
      organizationProfile,
      saveOrganizationProfile,
    } = organizationContext
    // Need to prefer using the organizationContext value for profile over
    // state since it will be most up to date after subsequent updates
    const profile =
      !isPending && organizationProfile
        ? organizationProfile
        : this.state.organizationProfile
    return (
      <OrganizationProfile
        organizationMeta={this.state.organizationMeta}
        organizationProfile={profile}
        saveProfile={values => saveOrganizationProfile(this.props.id, values)}
        isSaving={isPending}
        {...restProps}
      />
    )
  }
}

export default withOrganizationContext(
  withServiceContext(OrganizationProfileLoader)
)
