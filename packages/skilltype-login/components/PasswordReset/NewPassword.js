import React, { Component } from 'react'
import Content from '@skilltype/ui/components/Viewport/Content'
import Footer from '@skilltype/ui/components/Footer/Footer'
import Form from '@skilltype/ui/components/Form/Form'
import PasswordField from '@skilltype/ui/components/Form/Fields/PasswordField'
import Section from '@skilltype/ui/components/Section/Section'
import PageHeading from '@skilltype/ui/components/Heading/PageHeading'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import FullscreenModal from '@skilltype/ui/components/Modal/FullscreenModal'
import Progress from '@skilltype/ui/components/Progress/Progress'
import Tablet from '@skilltype/ui/components/Responsive/Tablet'
import MobileOnly from '@skilltype/ui/components/Responsive/MobileOnly'
import LogoSvg from '@skilltype/ui/assets/logo.svg'
import LogoIconSrc from '@skilltype/ui/assets/icon_dark_192.png'
import Page from '@skilltype/ui/components/Viewport/Page'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import { withLocationContext } from '@skilltype/ui/components/Router/Router'
import qs from 'qs'
import { withUserContext } from '../../../skilltype-user/components/User/UserProvider'

class UpdatePassword extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  state = {
    values: {},
    showProgress: false,
  }

  async componentDidMount() {
    const { token } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    })
    const isTokenValid = await this.props.userContext.validateResetToken(token)
    if (!isTokenValid) this.props.navigate('/passwordReset/invalidToken')
  }

  onChange = ({ values }) => this.setState({ values })

  /**
   * HTTP signup
   */
  onSubmit = () => {
    const { token } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    })
    const { newPassword, newPasswordMatch, values } = this.state
    if (newPassword === newPasswordMatch) {
      this.props.userContext.resetPassword(values, token)
    } else {
      this.props.notifyError('Passwords do not match')
      this.props.notifyClose(2000)
    }
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

  render() {
    return (
      <React.Fragment>
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
            <PageHeading
              style={{
                margin: '0.8em 0',
                textAlign: 'center',
                fontSize: '20px',
              }}
            >
              {'Reset Your Password'}
            </PageHeading>
            <PageHeading
              style={{
                margin: '0.8em 0',
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              {
                'Strong passwords include numbers, letters and punctuation marks'
              }
            </PageHeading>
            <Content>
              <Form
                id="new-password-form"
                onChange={this.onChange}
                values={this.state.values}
                onSubmit={this.onSubmit}
                disableSubmitUntilValid={false}
                disabled={this.showProgress}
              >
                <Section style={{ padding: '1rem 0' }}>
                  <PasswordField
                    id="newPassword"
                    label="Type your new password"
                    required
                    missingRequiredError="Please enter a new password"
                  />
                </Section>
                <Section style={{ padding: '1rem 0' }}>
                  <PasswordField
                    id="newPasswordMatch"
                    label="Type your new password one more time"
                    required
                    missingRequiredError="Please enter a matching new password"
                  />
                </Section>
                <SubmitButton>Submit</SubmitButton>
              </Form>
              <Footer style={{ textAlign: 'center' }}>
                &copy; 2019, Skilltype LLC. All rights reserved.
              </Footer>
            </Content>
          </Page>
        </FullscreenModal>
      </React.Fragment>
    )
  }
}

export default withLocationContext(
  withNotifyContext(withUserContext(UpdatePassword))
)
