import React from 'react'
import { storiesOf } from '@storybook/react'
import { profileTagGroups } from '@skilltype/data'
import Profile from '../../modules/Profile/Profile'
import ProfileFallback from '../../modules/Profile/ProfileFallback'
import { ViewportDecorator } from '../decorators'
import {
  profileData,
  populatedProfileData,
  profileMeta,
} from '../data/profile.data'

const { getTagGroups } = profileTagGroups

storiesOf('Modules//Profile', module)
  .addDecorator(ViewportDecorator)
  .add('empty', () => (
    <Profile tagGroups={getTagGroups(profileData, profileMeta)} />
  ))
  .add('populated', () => (
    <Profile tagGroups={getTagGroups(populatedProfileData, profileMeta)} />
  ))
  .add('loading', () => <ProfileFallback />)
