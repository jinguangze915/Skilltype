import React from 'react'
import Page from '@skilltype/ui/components/Viewport/Page'
import Content from '@skilltype/ui/components/Viewport/Content'
import Footer from '@skilltype/ui/components/Footer/Footer'
import Form from '@skilltype/ui/components/Form/Form'
import EmailField from '@skilltype/ui/components/Form/Fields/EmailField'
import PasswordField from '@skilltype/ui/components/Form/Fields/PasswordField'
import Section from '@skilltype/ui/components/Section/Section'
import FullscreenModal from '@skilltype/ui/components/Modal/FullscreenModal'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import SecondaryButton from '@skilltype/ui/components/Button/SecondaryButton'
import PrimaryTextButton from '@skilltype/ui/components/Button/PrimaryTextButton'
import NotifyError from '@skilltype/ui/components/Notify/NotifyError'
import Progress from '@skilltype/ui/components/Progress/Progress'
import Tablet from '@skilltype/ui/components/Responsive/Tablet'
import TextDivider from '@skilltype/ui/components/TextDivider/TextDivider'
import LogoSvg from '@skilltype/ui/assets/logo.svg'
import LogoIconSrc from '@skilltype/ui/assets/icon_dark_192.png'
import MobileOnly from '@skilltype/ui/components/Responsive/MobileOnly'
import PageHeading from '@skilltype/ui/components/Heading/PageHeading'
import injectSheet from 'react-jss'
import classnames from 'classnames'
import styles from './styles'

const LoginModal = ({
  classes,
  onChange,
  onSubmit,
  onDismiss,
  values,
  className,
  style,
  showUnauthorizedError,
  unauthorizedErrorOnClose,
  showProgress,
  formContextRef,
  onModalSubmit,
}) => (
  <FullscreenModal
    onDismiss={onDismiss}
    hasEditableContent
    appElementId="root"
    showOkButton
    onOk={onModalSubmit}
    okButtonLabel="Login"
    className={classnames(className, classes.login)}
    style={style}
    standalone
    title={
      <a href="https://www.skilltype.com" className={classes.logo}>
        <Tablet notMobileOs>
          <LogoSvg />
        </Tablet>
        <MobileOnly orMobileOs>
          <img src={LogoIconSrc} alt="skilltype logo" />
        </MobileOnly>
      </a>
    }
  >
    <Page centerContent centerSelf>
      {showProgress && <Progress inFullscreenModal />}
      <PageHeading style={{ margin: '0.8em 0', textAlign: 'center' }}>
        Sign In
      </PageHeading>
      <Content>
        <Form
          id="login"
          onChange={onChange}
          values={values}
          onSubmit={onSubmit}
          disableSubmitUntilValid={false}
          disabled={showProgress}
          contextRef={formContextRef}
        >
          <Section style={{ padding: '1rem 0' }}>
            <NotifyError
              show={showUnauthorizedError}
              onClose={unauthorizedErrorOnClose}
              id="login-notify"
            >
              Incorrect email address and / or password.<br />
              Do you need{' '}
              <a href="https://www.skilltype.com/forgot">help logging in</a>?
            </NotifyError>
            <EmailField
              id="email"
              label="Work Email"
              required
              missingRequiredError="Please enter a valid work email address"
            />
            <PasswordField
              id="password"
              label="Password"
              required
              missingRequiredError="Please enter a password"
            />
          </Section>
          <SubmitButton>Login</SubmitButton>
          <PrimaryTextButton href="/passwordReset" navigate>
            Having password trouble?
          </PrimaryTextButton>
          <Section>
            <TextDivider style={{ margin: '1rem 0' }}>or</TextDivider>
          </Section>
          <SecondaryButton href="/signup" navigate>
            Sign Up
          </SecondaryButton>
        </Form>
        <Footer style={{ textAlign: 'center' }}>
          &copy; 2019, Skilltype LLC. All rights reserved.
        </Footer>
      </Content>
    </Page>
  </FullscreenModal>
)

export default injectSheet(styles)(LoginModal)
