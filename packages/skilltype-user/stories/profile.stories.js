import React from 'react'
import { storiesOf } from '@storybook/react'
import { ViewportDecorator } from '@skilltype/ui/stories/decorators'
import {
  profileData,
  populatedProfileData,
  profileMeta,
  userData,
} from '@skilltype/ui/stories/data/profile.data'
import { ServiceProviderDecorator, UserProviderDecorator } from './decorators'
import Body from '../components/App/Body'
import Header from '../components/App/Header'
import Profile from '../components/Profile/Profile'

const fullName = `${userData.firstName} ${userData.lastName}`

class ProfileStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileData: props.profileData,
    }
  }
  render() {
    return (
      <Profile
        profileData={this.state.profileData}
        profileMeta={profileMeta}
        saveProfile={tagGroups =>
          new Promise(resolve => {
            this.setState(
              { profileData: { ...profileData, ...tagGroups } },
              resolve(true)
            )
          })
        }
      />
    )
  }
}

storiesOf('Demos//Profile', module)
  .addDecorator(ViewportDecorator)
  .addDecorator(UserProviderDecorator)
  .addDecorator(ServiceProviderDecorator)
  .add('default', () => (
    <React.Fragment>
      <Header title={fullName} />
      <Body userData={userData}>
        <ProfileStory profileData={populatedProfileData} />
      </Body>
    </React.Fragment>
  ))
