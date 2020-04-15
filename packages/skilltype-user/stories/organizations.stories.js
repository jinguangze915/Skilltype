import React from 'react'
import { storiesOf } from '@storybook/react'
import Router from '@skilltype/ui/components/Router/Router'
import AppMenuBar from '@skilltype/ui/components/MenuBar/AppMenuBar'
import UserHeaderMenu from '@skilltype/ui/components/Menu/UserHeaderMenu'
import OrgList from '@skilltype/ui/modules/Organization/OrganizationList'
import { ViewportDecorator } from '@skilltype/ui/stories/decorators'
import {
  userContextAdmin,
  organizationsList,
} from '@skilltype/ui/stories/data/organizationsList.data'
import Organization from '../components/Organization/Loaders/OrganizationLoader'
import CreateOrganizationModal from '../components/Organization/CreateOrganizationModal'
import {
  ServiceProviderDecorator,
  UserProviderDecorator,
  OrganizationProviderDecorator,
  LocationProviderDecorator,
} from './decorators'

const createOrganization = () => new Promise(resolve => resolve())
const fetchOrganization = () => new Promise(resolve => resolve(true))
const saveProfile = () =>
  new Promise(resolve => {
    resolve(true)
  })
const organizationContext = {
  createOrganization,
  fetchOrganization,
  saveProfile,
}

const OrganizationList = ({
  organizations,
  showAdd,
  navigate,
  userContext,
}) => (
  <React.Fragment>
    <OrgList
      showAdd={showAdd}
      organizations={organizations}
      onAdd={() => navigate('./create')}
      onClick={() => {}}
    />
    <Router>
      <CreateOrganizationModal
        path="/create"
        userContext={userContext}
        organizationContext={organizationContext}
      />
    </Router>
  </React.Fragment>
)

// Organizations List Demo
storiesOf('Demos//Organization//List', module)
  .addDecorator(ViewportDecorator)
  .addDecorator(LocationProviderDecorator)
  .add('role admin', () => (
    <React.Fragment>
      <AppMenuBar title="Organizations" pinned height={50}>
        <UserHeaderMenu id="organization-header-menu" title="Organizations" />
      </AppMenuBar>
      <Router>
        <OrganizationList
          default
          showAdd
          organizations={organizationsList}
          userContext={userContextAdmin}
          onClick={() => {}}
        />
      </Router>
    </React.Fragment>
  ))

const OrganizationStory = () => (
  <Router>
    <Organization default id="4" />
  </Router>
)

// Organization Page Demo
storiesOf('Demos//Organization//Page', module)
  .addDecorator(ViewportDecorator)
  .addDecorator(UserProviderDecorator)
  .addDecorator(OrganizationProviderDecorator)
  .addDecorator(LocationProviderDecorator)
  .addDecorator(ServiceProviderDecorator)
  .add('default', () => <OrganizationStory />)
