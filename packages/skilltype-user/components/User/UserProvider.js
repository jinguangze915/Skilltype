import React from 'react'
import { Redirect } from '@reach/router'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import { withServiceContext } from '@skilltype/services/components/ServiceProvider'
import Progress from '@skilltype/ui/components/Progress/ProgressPortal'
import bugsnagClient from '@skilltype/services/lib/bugsnag'

const { Consumer, Provider } = React.createContext()

class UserProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      profile: null,
      isSaving: false,
    }
    this.userContext = {
      saveUser: this.saveUser,
      fetchProfile: this.fetchProfile,
      saveProfile: this.saveProfile,
      saveSettings: this.saveSettings,
      changePassword: this.changePassword,
      requestPasswordReset: this.requestPasswordReset,
      confirmEmail: this.confirmEmail,
      validateResetToken: this.validateResetToken,
      resetPassword: this.resetPassword,
      inviteUsersOrganization: this.inviteUsersOrganization,
      inviteUsers: this.inviteUsers,
    }
  }
  saveUser = async (
    values,
    successMessage = 'User has been updated.',
    errorMessage = 'Error updating user. Please try again later.'
  ) => {
    const { serviceContext, notify, notifyError } = this.props
    this.setState({ isSaving: true })
    try {
      await serviceContext.user.save(values)
      this.setState({ user: values, isSaving: false })
      notify(successMessage)
    } catch (err) {
      notifyError(errorMessage)
    }
  }
  fetchProfile = () => {
    // if profile is already populated, skip fetch
    if (!this.state.profile) {
      this.setState({
        profile: this.props.serviceContext.user
          .getProfile()
          .then(profile => this.setState({ profile })),
      })
    }
  }
  saveProfile = async values => {
    const { serviceContext, notify, notifyError } = this.props
    this.setState({ isSaving: true })
    try {
      await serviceContext.user.saveProfile(values)
      this.setState({ isSaving: false, profile: values })
      notify('Profile has been updated.')
      return true
    } catch (err) {
      console.error(err)
      notifyError('Error updating profile. Please try again later.')
      this.setState({ isSaving: false })
      return false
    }
  }
  saveSettings = async (
    values,
    successMessage = 'Settings updated successfully.',
    errorMessage = 'Error updating settings. Please try again later.'
  ) => {
    const { serviceContext, notify, notifyError } = this.props
    this.setState({ isSaving: true })
    try {
      const user = await serviceContext.user.saveSettings(values)
      this.setState({ isSaving: false, user })
      notify(successMessage)
      return true
    } catch (err) {
      console.error(err)
      notifyError(errorMessage)
      this.setState({ isSaving: false })
      return false
    }
  }
  changePassword = async values => {
    const { serviceContext, notify, notifyError } = this.props
    this.setState({ isSaving: true })

    try {
      await serviceContext.user.changePassword(values)
      this.setState({ isSaving: false })
      notify('Password has been updated successfully.')
      return true
    } catch (err) {
      console.error(err)
      notifyError('Error updating password. Please try again later.')
      this.setState({ isSaving: false })
      return false
    }
  }
  requestPasswordReset = async values => {
    const { serviceContext } = this.props
    try {
      await serviceContext.user.requestPasswordReset(values)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }
  validateResetToken = async token => {
    const { serviceContext, notifyError, notifyClose } = this.props
    try {
      await serviceContext.user.validateResetToken(token)
      return true
    } catch (err) {
      console.error(err)
      notifyError('Invalid Password Reset Token')
      notifyClose(2000)
      return false
    }
  }
  confirmEmail = token => {
    const { serviceContext } = this.props
    return serviceContext.user.confirmEmail(token)
  }
  resetPassword = async (values, token) => {
    const { serviceContext, notify, notifyError } = this.props
    this.setState({ isSaving: true })
    try {
      await serviceContext.user.resetPassword(values, token)
      this.setState({ isSaving: false })
      notify('Password has been reset successfully.')
      return true
    } catch (err) {
      console.error(err)
      notifyError(
        'Your password reset token is either invalid or expired. Please request another one'
      )
      this.setState({ isSaving: false })
      return false
    }
  }

  inviteUsersOrganization = async values => {
    const { serviceContext, notify, notifyClose } = this.props

    this.setState({ isSaving: true })

    try {
      await serviceContext.user.inviteUsersOrganization(values)

      this.setState({ isSaving: false })
      notify('Invites successfully sent.')
      notifyClose(2000)
      return true
    } catch (err) {
      console.error(err)
      this.setState({ isSaving: false })
      return false
    }
  }

  inviteUsers = async values => {
    const { serviceContext, notify, notifyClose } = this.props

    this.setState({ isSaving: true })

    try {
      await serviceContext.user.inviteUsers(values)

      this.setState({ isSaving: false })
      notify('Invites successfully sent.')
      notifyClose(2000)
      return true
    } catch (err) {
      console.error(err)
      this.setState({ isSaving: false })
      return false
    }
  }

  render() {
    const userContext = {
      ...this.userContext,
      ...this.state,
    }
    // set bugsnag user
    bugsnagClient.user = {
      email: this.props.user.email,
      name: `${this.props.user.firstName} ${this.props.user.lastName}`,
    }
    return (
      <Provider value={userContext}>
        {this.state.isSaving && <Progress />}
        {this.props.children}
      </Provider>
    )
  }
}

export default withNotifyContext(withServiceContext(UserProvider))

export const withUserContext = Wrapped => props => (
  <Consumer>
    {context => {
      if (!context) {
        console.warn(
          'withUserContext component not wrapped in a UserProvider',
          Wrapped
        )
        return <Wrapped {...props} />
      }
      return <Wrapped {...props} userContext={context} />
    }}
  </Consumer>
)

/**
 * User Roles
 * - Helper functions
 */

export const ROLE_USER = 'ROLE_USER'
export const ROLE_ORG_ADMIN = 'ROLE_ORG_ADMIN'
export const ROLE_ADMIN = 'ROLE_ADMIN'
export const ROLE_SKILLTYPE_ADMIN = 'ROLE_SKILLTYPE_ADMIN'

export const isRole = (user, role) => user.role.name === role

// TODO @jacob: Update the org permission checking with the organizationId, once it's live on the backend
export const isRoleOrganization = user => isRole(user, ROLE_ORG_ADMIN)

// Check user role
export const userIsRoleUser = user => isRole(user, ROLE_USER)
export const userIsRoleOrgAdmin = user => isRole(user, ROLE_ORG_ADMIN)
export const userIsRoleAdmin = user => isRole(user, ROLE_ADMIN)
export const userIsRoleSkilltypeAdmin = user =>
  isRole(user, ROLE_SKILLTYPE_ADMIN)

// Generic GuardComponent for any role
const GuardRole = withUserContext(
  ({ roleCheckFn, redirect = '/', userContext, children }) => {
    if (roleCheckFn(userContext.user)) {
      return <React.Fragment>{children}</React.Fragment>
    }
    /**
     * <Redirect> component's noThrow will prevent the tree starting at /admin
     * from rendering and will start over. This prevents a development
     * environemnt error from Create React App
     *
     * Documentation: https://reach.tech/router/api/Redirect#noThrow
     */
    return <Redirect from="/" to={redirect} noThrow />
  }
)

export const GuardRoleUser = ({ redirect, children }) => (
  <GuardRole roleCheckFn={userIsRoleUser} redirect={redirect}>
    {children}
  </GuardRole>
)

export const GuardRoleOrgAdmin = ({ orgId, redirect, children }) => (
  <GuardRole roleCheckFn={userIsRoleOrgAdmin(orgId)} redirect={redirect}>
    {children}
  </GuardRole>
)

export const GuardRoleAdmin = ({ redirect, children }) => (
  <GuardRole roleCheckFn={userIsRoleOrgAdmin} redirect={redirect}>
    {children}
  </GuardRole>
)

export const GuardRoleSkilltypeAdmin = ({ redirect, children }) => (
  <GuardRole roleCheckFn={userIsRoleSkilltypeAdmin} redirect={redirect}>
    {children}
  </GuardRole>
)
