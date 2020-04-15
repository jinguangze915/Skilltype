import React from 'react'
import { withAwait } from '@skilltype/ui/components/Await/Await'
import Header from '../App/Header'
import Body from '../App/Body'
import Settings from './Settings'
import SettingsFallback from './SettingsFallback'
import { withUserContext } from '../User/UserProvider'

const SettingsPage = props => (
  <React.Fragment>
    <Header title="Settings" />
    <Body userData={props.userContext.user}>
      <Settings {...props} />
    </Body>
  </React.Fragment>
)

export default withAwait(withUserContext(SettingsPage), SettingsFallback)
