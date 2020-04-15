import React from 'react'
import { storiesOf } from '@storybook/react'
import OrganizationList from '../../modules/Organization/OrganizationList'
import OrganizationListFallback from '../../modules/Organization/OrganizationListFallback'
import { ViewportDecorator } from '../decorators'
import {
  organizationsList,
  userContextAdmin,
  userContextUser,
} from '../data/organizationsList.data'

// Organizations List
storiesOf('Modules//Organization//List', module)
  .addDecorator(ViewportDecorator)
  .add('role user: empty', () => <OrganizationListFallback />)
  .add('role user: default', () => (
    <OrganizationList
      organizations={organizationsList}
      onAdd={() => null}
      userContext={userContextUser}
    />
  ))
  .add('role admin: empty', () => (
    <OrganizationList
      default
      showAdd
      organizations={[]}
      userContext={userContextAdmin}
    />
  ))
  .add('role admin: default', () => (
    <OrganizationList
      default
      showAdd
      organizations={organizationsList}
      userContext={userContextAdmin}
    />
  ))
