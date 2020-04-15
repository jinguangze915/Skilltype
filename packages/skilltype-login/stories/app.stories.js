import React from 'react'
import { storiesOf } from '@storybook/react'
import { LoginViewportDecorator } from './decorators'
import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'

storiesOf('Modules//Login', module)
  .addDecorator(LoginViewportDecorator)
  .add('default', () => <Login />)
  .add('unauthorized', () => <Login showUnauthorizedError />)
storiesOf('Modules//Signup', module)
  .addDecorator(LoginViewportDecorator)
  .add('default', () => <Signup />)
  .add('invalid access code', () => <Signup showInvalidAccessCode />)
