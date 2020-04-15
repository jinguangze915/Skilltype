import bugsnagClient from '@skilltype/services/lib/bugsnag'
import { boot as bootIntercom } from '@skilltype/services/lib/intercom'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@skilltype/ui'
import ServiceProvider from '@skilltype/services/components/ServiceProvider'
import Router from '@skilltype/ui/components/Router/Router'
import NotifyProvider from '@skilltype/ui/components/Notify/NotifyProvider'
import { isMobile } from '@skilltype/ui/lib/mediaQuery'
import createPlugin from 'bugsnag-react'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import PasswordReset from './components/PasswordReset/PasswordReset'
import NewPassword from './components/PasswordReset/NewPassword'
import UserProvider from '../skilltype-user/components/User/UserProvider'
import InvalidToken from './components/PasswordReset/InvalidToken'

bootIntercom({ hide_default_launcher: isMobile() })

const ErrorBoundary = bugsnagClient.use(createPlugin(React))

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider>
      <NotifyProvider>
        <ServiceProvider>
          <UserProvider user={{ email: '' }}>
            <Router>
              <Login path="/login" />
              <Signup path="/signup" />
              <PasswordReset path="/passwordReset" />
              <NewPassword path="/passwordReset/new" />
              <InvalidToken path="/passwordReset/invalidToken" />
            </Router>
          </UserProvider>
        </ServiceProvider>
      </NotifyProvider>
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root')
)
