import React from 'react'
import { storiesOf } from '@storybook/react'
import { ViewportDecorator } from '../decorators'
import CardMenu from '../../modules/CardMenu/CardMenu'
import CardMenuLoader from '../../modules/CardMenu/CardMenuLoader'
import menuData from '../data/cardMenu.data'

storiesOf('Modules//Card Menu', module)
  .addDecorator(ViewportDecorator)
  .add('default', () => (
    <React.Fragment>
      <CardMenu menuItems={menuData} />
    </React.Fragment>
  ))
  .add('loading', () => (
    <React.Fragment>
      <CardMenuLoader menuItems={new Promise(() => {})} />
    </React.Fragment>
  ))
