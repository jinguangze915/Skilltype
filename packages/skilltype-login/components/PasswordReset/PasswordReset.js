import React, { Component } from 'react'
import Page from '@skilltype/ui/components/Viewport/Page'
import FullscreenModal from '@skilltype/ui/components/Modal/FullscreenModal'
import Progress from '@skilltype/ui/components/Progress/Progress'
import Tablet from '@skilltype/ui/components/Responsive/Tablet'
import MobileOnly from '@skilltype/ui/components/Responsive/MobileOnly'
import LogoSvg from '@skilltype/ui/assets/logo.svg'
import LogoIconSrc from '@skilltype/ui/assets/icon_dark_192.png'
import RequestPasswordReset from './RequestPasswordReset'
import PasswordResetConfirmation from './PasswordResetConfirmation'
import { withUserContext } from '../../../skilltype-user/components/User/UserProvider'

class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  state = {
    values: {},
    showProgress: false,
    page: 'REQUEST_PASSWORD_RESET',
  }

  onChange = ({ values }) => this.setState({ values })

  /**
   * HTTP signup
   */
  onSubmit = async (e, { isValid }) => {
    if (!isValid) return
    this.changePage('PASSWORD_RESET_CONFIRMATION')
    const { values } = this.state
    await this.props.userContext.requestPasswordReset(values)
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

  changePage = page => {
    this.setState({ page })
  }

  render() {
    return (
      <FullscreenModal
        onDismiss={this.onDismiss}
        hasEditableContent
        appElementId="root"
        showOkButton
        onOk={this.onModalSubmit}
        okButtonLabel="Sign Up"
        standalone
        title={
          <a href="https://www.skilltype.com">
            <Tablet notMobileOs>
              <LogoSvg />
            </Tablet>
            <MobileOnly orMobileOs>
              <img
                src={LogoIconSrc}
                alt="skilltype logo"
                style={{ width: '40px' }}
              />
            </MobileOnly>
          </a>
        }
      >
        <Page centerContent centerSelf>
          {this.state.showProgress && <Progress inFullscreenModal />}
          {this.state.page === 'REQUEST_PASSWORD_RESET' && (
            <RequestPasswordReset
              values={this.state.values}
              showProgress={this.state.showProgress}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              changePage={this.changePage}
            />
          )}
          {this.state.page === 'PASSWORD_RESET_CONFIRMATION' && (
            <PasswordResetConfirmation values={this.state.values} />
          )}
        </Page>
      </FullscreenModal>
    )
  }
}

export default withUserContext(PasswordReset)
