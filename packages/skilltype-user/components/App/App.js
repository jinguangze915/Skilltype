import React from 'react'
import Router from '@skilltype/ui/components/Router/Router'
import Viewport from '@skilltype/ui/components/Viewport/ThemedViewport'
import NotifyProvider from '@skilltype/ui/components/Notify/NotifyProvider'
import { isMobile } from '@skilltype/ui/lib/mediaQuery'
import { boot as bootIntercom } from '@skilltype/services/lib/intercom'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import UserProvider from '../User/UserLoader'
import Home from '../Home/Home'
import EmailConfirm from '../EmailConfirm/EmailConfirm'
import Profile from '../Profile/ProfilePage'
import Settings from '../Settings/SettingsLoader'
import ChangePasswordModal from '../Settings/ChangePasswordModal'
import Library from '../Library/LibraryPage'
import OrganizationProvider from '../Organization/OrganizationProvider'
import OrganizationList from '../Organization/OrganizationList'
import Organization from '../Organization/Loaders/OrganizationLoader'
import CreateOrganizationModal from '../Organization/CreateOrganizationModal'
import AdminRouter from '../Admin/AdminRouter'
import Logout from './Logout'
import AdminIndex from '../Admin/AdminIndex'

const OrganizationRouter = ({ children }) => children

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.serviceContext.user.getSettings().then(user => {
        this.setState({ user })
        bootIntercom({ user, hide_default_launcher: isMobile() })
      }),
    }
  }
  render() {
    return (
      <Viewport fullscreen style={{ paddingTop: 0 }}>
        <NotifyProvider>
          <UserProvider user={this.state.user}>
            <OrganizationProvider>
              <Router resetScrollOnNavigate>
                <Home default />
                <EmailConfirm path="/confirmation" />
                <Profile path="/profile" />
                <Settings path="/settings">
                  <ChangePasswordModal path="password" />
                </Settings>
                <OrganizationRouter path="/organizations">
                  <OrganizationList path="/" />
                  <OrganizationList path="/create">
                    <CreateOrganizationModal default />
                  </OrganizationList>
                  <Organization path="/:id/*" />
                </OrganizationRouter>
                <Library title="Feed" path="/feed" />
                <AdminRouter path="/admin">
                  <AdminIndex path="/*" />
                </AdminRouter>
                <Logout path="/logout" />
              </Router>
            </OrganizationProvider>
          </UserProvider>
        </NotifyProvider>
      </Viewport>
    )
  }
}

export default withServiceContext(App)
