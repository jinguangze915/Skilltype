import React from 'react'
import { storiesOf } from '@storybook/react'
import { GuestViewportDecorator } from './decorators'
import GuestHome from '../components/Home/Home'

storiesOf('Demos//Guest', module)
  .addDecorator(GuestViewportDecorator)
  .add('Home', () => <GuestHome />)
