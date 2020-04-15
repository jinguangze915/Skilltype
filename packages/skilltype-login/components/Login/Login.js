/* @flow */
import React from 'react'
import { login, setAuthCookie } from '@skilltype/services/lib/auth'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import LoginModal from './LoginModal'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }
  state = {
    values: {},
    showProgress: false,
    showUnauthorizedError: this.props.showUnauthorizedError,
  }
  onChange = ({ values }) => this.setState({ values })
  onSubmit = (e, { isValid }) => {
    if (!isValid) {
      return
    }
    this.setState(
      {
        showUnauthorizedError: false,
        showProgress: isValid,
      },
      async () => {
        try {
          const token = await login({
            username: this.state.values.email,
            password: this.state.values.password,
          })
          if (!token) {
            this.setState({
              showProgress: false,
              showUnauthorizedError: true,
            })
          } else {
            setAuthCookie(token)
            window.location = '/feed'
          }
        } catch (err) {
          this.props.notifyError('Network error, please try again')
          this.setState({
            showProgress: false,
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
      showUnauthorizedError: false,
    })
  }
  render() {
    return (
      <LoginModal
        onChange={this.onChange}
        values={this.state.values}
        onSubmit={this.onSubmit}
        onModalSubmit={this.onModalSubmit}
        className={this.props.className}
        style={this.props.style}
        showUnauthorizedError={this.state.showUnauthorizedError}
        showProgress={this.state.showProgress}
        onDismiss={this.onDismiss}
        unauthorizedErrorOnClose={this.unauthorizedErrorOnClose}
        formContextRef={this.setFormRef}
      />
    )
  }
}

export default withNotifyContext(Login)
