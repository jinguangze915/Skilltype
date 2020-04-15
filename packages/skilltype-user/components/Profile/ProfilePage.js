import React from 'react'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import ProfileCard from '@skilltype/ui/components/ProfileCard/ProfileCard'
import MobileOnly from '@skilltype/ui/components/Responsive/MobileOnly'
import profileMeta from '@skilltype/data/data/profile-sections.json'
import affiliationPermissions from '@skilltype/data/data/affiliation-permissions.json'
import Header from '../App/Header'
import Body from '../App/Body'
import Profile from './ProfileLoader'
import { withUserContext } from '../User/UserProvider'

class ProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileMeta,
      affiliationPermissions,
    }
  }
  componentWillMount() {
    this.props.userContext.fetchProfile()
  }
  render() {
    const { userContext } = this.props
    const { firstName, lastName } = userContext.user
    const menuTitle = `${firstName} ${lastName}`
    const { city, state } = userContext.user
    const location = city && state ? `${city}, ${state}` : ''
    const cardData = {
      profileTheme: userContext.user.cardColor || 'fog',
      name: `${userContext.user.firstName} ${userContext.user.lastName}`,
      tagline: userContext.user.tagline || '',
      location,
      avatarLabel:
        userContext.user.firstName.charAt(0).toUpperCase() +
        userContext.user.lastName.charAt(0).toUpperCase(),
      verified: false,
    }
    return (
      <React.Fragment>
        <Header title={menuTitle} />
        <Body userData={userContext.user}>
          <MobileOnly>
            <ProfileCard {...cardData} style={{ marginBottom: '2em' }} />
          </MobileOnly>
          <Profile
            affiliationPermissions={this.state.affiliationPermissions}
            profileData={userContext.profile}
            profileMeta={this.state.profileMeta}
            userData={userContext.user}
            isSaving={userContext.isSaving}
            saveProfile={userContext.saveProfile}
          />
        </Body>
      </React.Fragment>
    )
  }
}

export default withUserContext(withServiceContext(ProfilePage))
