import React from 'react'
import { storiesOf } from '@storybook/react'
import { ViewportDecorator } from '@skilltype/ui/stories/decorators'
import Settings from '../components/Settings/Settings'
import SettingsFallback from '../components/Settings/SettingsFallback'

storiesOf('Modules//Settings', module)
  .addDecorator(ViewportDecorator)
  .add('default', () => (
    <React.Fragment>
      <Settings />
    </React.Fragment>
  ))
  .add('loading', () => (
    <React.Fragment>
      <SettingsFallback />
    </React.Fragment>
  ))
