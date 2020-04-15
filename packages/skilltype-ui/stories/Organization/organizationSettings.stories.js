import React from 'react'
import { storiesOf } from '@storybook/react'
import OrganizationSettings from '../../modules/Organization/OrganizationSettings'
import OrganizationSettingsFallback from '../../modules/Organization/OrganizationSettingsFallback'
import { ViewportDecorator } from '../decorators'

storiesOf('Modules//Organization//Settings', module)
  .addDecorator(ViewportDecorator)
  .add('default', () => <OrganizationSettings saveOrganization={() => {}} />)
  .add('loading', () => <OrganizationSettingsFallback />)
