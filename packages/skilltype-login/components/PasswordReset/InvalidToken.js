import React, { Component } from 'react'
import PageHeading from '@skilltype/ui/components/Heading/PageHeading'
import FullscreenModal from '@skilltype/ui/components/Modal/FullscreenModal'
import Tablet from '@skilltype/ui/components/Responsive/Tablet'
import MobileOnly from '@skilltype/ui/components/Responsive/MobileOnly'
import LogoSvg from '@skilltype/ui/assets/logo.svg'
import LogoIconSrc from '@skilltype/ui/assets/icon_dark_192.png'
import Page from '@skilltype/ui/components/Viewport/Page'
import PrimaryButton from '@skilltype/ui/components/Button/PrimaryButton'
import { withLocationContext } from '@skilltype/ui/components/Router/Router'

class InvalidToken extends Component {
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
            <PageHeading
              style={{
                margin: '0.8em 0',
                textAlign: 'center',
                fontSize: '20px',
              }}
            >
              {'Invalid Password Reset Token'}
            </PageHeading>
            <PageHeading
              style={{
                margin: '0.8em 0',
                textAlign: 'center',
                fontSize: '16px',
              }}
            >
              {
                'Unfortunately the password reset token is no longer valid or already used. Please request another password reset'
              }
            </PageHeading>
            <PrimaryButton href="/passwordReset" navigate>
              Request a password reset
            </PrimaryButton>
          </Page>
        </FullscreenModal>
      </React.Fragment>
    )
  }
}

export default withLocationContext(InvalidToken)
