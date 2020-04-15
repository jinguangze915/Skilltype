import React from 'react'
import {
  LocationProvider,
  createMemorySource,
  createHistory,
} from '@reach/router'
import ServiceProvider from '@skilltype/services/components/ServiceProvider'
import * as user from '@skilltype/services/user/mocks'
import * as organization from '@skilltype/services/organization/mocks'
import * as content from '@skilltype/services/content/mocks'
import UserProvider from '../components/User/UserProvider'
import OrganizationProvider from '../components/Organization/OrganizationProvider'

const source = createMemorySource('/')
const history = createHistory(source)

export const LocationProviderDecorator = storyFn => (
  <LocationProvider history={history}>{storyFn()}</LocationProvider>
)

const services = { user, content, organization }

export const ServiceProviderDecorator = storyFn => (
  <ServiceProvider services={services}>{storyFn()}</ServiceProvider>
)

export const UserProviderDecorator = storyFn => (
  <UserProvider user={{ firstName: '', lastName: '', email: '' }}>
    {storyFn()}
  </UserProvider>
)

// Organization Provider Decorator will pull mocked APi calls from ServiceProviderDecorator.serviceContext.organization
const notify = () => {}
const notifyError = () => {}
export const OrganizationProviderDecorator = storyFn => (
  <OrganizationProvider notify={notify} notifyError={notifyError}>
    {storyFn()}
  </OrganizationProvider>
)
