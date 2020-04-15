import React from 'react'
import { storiesOf } from '@storybook/react'
import { organizationTagGroups } from '@skilltype/data'
import OrganizationProfile from '../../modules/Organization/OrganizationProfile'
import OrganizationProfileFallback from '../../modules/Organization/OrganizationProfileFallback'
import { ViewportDecorator } from '../decorators'
import {
  populatedOrganizationData,
  organizationMeta,
} from '../data/organizationPage.data'

const { getTagGroups, suggestionsByType } = organizationTagGroups

storiesOf('Modules//Organization//Profile1', module)
  .addDecorator(ViewportDecorator)
  .add('default', () => (
    <OrganizationProfile
      getTagGroups={getTagGroups}
      suggestionsByType={suggestionsByType}
      organizationProfile={populatedOrganizationData}
      organizationMeta={organizationMeta}
    />
  ))
  .add('admin mode', () => (
    <OrganizationProfile
      getTagGroups={getTagGroups}
      suggestionsByType={suggestionsByType}
      organizationProfile={populatedOrganizationData}
      organizationMeta={organizationMeta}
      adminMode
    />
  ))
  .add('loading', () => <OrganizationProfileFallback />)
