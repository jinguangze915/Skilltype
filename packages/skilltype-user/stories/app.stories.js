import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  UserProviderDecorator,
  OrganizationProviderDecorator,
  LocationProviderDecorator,
  ServiceProviderDecorator,
} from './decorators'
import App from '../components/App/App'

storiesOf('Demos//App', module)
  .addDecorator(UserProviderDecorator)
  .addDecorator(OrganizationProviderDecorator)
  .addDecorator(LocationProviderDecorator)
  .addDecorator(ServiceProviderDecorator)
  .add('default', () => {
    console.log('mounting app demo')
    return <App />
  })
