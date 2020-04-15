import React from 'react'
import { signup } from '@skilltype/services/lib/auth'
import { withLocationContext } from '@skilltype/ui/components/Router/Router'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import qs from 'qs'
import SignupModal from './SignupModal'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }
  state = {
    values: {},
    showPassword: false,
    showProgress: false,
    showInvalidInviteCode: this.props.showInvalidInviteCode,
    errorMessage: null,
    invitedUser: false,
  }

  componentDidMount = () => {
    const { email, token } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    })
    if (email && token) {
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          email,
          inviteCode: token,
        },
        invitedUser: true,
      }))
    }
  }

  onChange = ({ values }) => this.setState({ values })
  onTogglePassword = () =>
    this.setState({ showPassword: !this.state.showPassword })

  /**
   * HTTP signup
   */
  onSubmit = (_, { isValid }) => {
    if (!isValid) {
      return
    }
    this.setState(
      {
        showInvalidInviteCode: false,
        showProgress: isValid,
      },
      async () => {
        const {
          values: {
            firstName,
            lastName,
            email,
            secondaryEmail,
            password,
            zipcode,
            inviteCode,
          },
        } = this.state

        try {
          await signup({
            firstName,
            lastName,
            email,
            secondaryEmail,
            password,
            zipcode,
            inviteCode,
          })

          // When signup is successful, progress to `/login` so the user can enter credentials
          this.props.navigate('/login')
          this.props.notify('Successfully signed up')
        } catch (err) {
          let message = 'Unable to sign up. Try again later.'

          try {
            const { message: m } = JSON.parse(err.message)
            message = m
          } catch (e) {
            message = err.message
          }
          // this.props.notifyError('Network error, please try again')
          this.setState({
            showProgress: false,
            showInvalidInviteCode: true,
            errorMessage: message,
          })
        }
      }
    )
  }
  onDismiss = () => {
    window.location = 'https://www.skilltype.com'
  }
  onModalSubmit = () => {
    this.formRef.submit()
  }
  setFormRef = e => {
    this.formRef = e
  }
  unauthorizedErrorOnClose = () => {
    this.setState({
      showInvalidInviteCode: false,
    })
  }
  render() {
    return (
      <SignupModal
        onChange={this.onChange}
        values={this.state.values}
        onSubmit={this.onSubmit}
        onModalSubmit={this.onModalSubmit}
        className={this.props.className}
        style={this.props.style}
        showPassword={this.state.showPassword}
        onTogglePassword={this.onTogglePassword}
        showInvalidInviteCode={this.state.showInvalidInviteCode}
        errorMessage={this.state.errorMessage}
        showProgress={this.state.showProgress}
        onDismiss={this.onDismiss}
        unauthorizedErrorOnClose={this.unauthorizedErrorOnClose}
        formContextRef={this.setFormRef}
        invitedUser={this.state.invitedUser}
      />
    )
  }
}

export default withNotifyContext(withLocationContext(SignUp))
