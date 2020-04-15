import React from 'react'
import Page from '@skilltype/ui/components/Viewport/Page'
import Content from '@skilltype/ui/components/Viewport/Content'
import Footer from '@skilltype/ui/components/Footer/Footer'
import Form from '@skilltype/ui/components/Form/Form'
import TextField from '@skilltype/ui/components/Form/Fields/TextField'
import ZipField from '@skilltype/ui/components/Form/Fields/ZipField'
import EmailField from '@skilltype/ui/components/Form/Fields/EmailField'
import PasswordField from '@skilltype/ui/components/Form/Fields/PasswordField'
import Section from '@skilltype/ui/components/Section/Section'
import RawSection from '@skilltype/ui/components/Section/RawSection'
import FullscreenModal from '@skilltype/ui/components/Modal/FullscreenModal'
import PageHeading from '@skilltype/ui/components/Heading/PageHeading'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import SecondaryButton from '@skilltype/ui/components/Button/SecondaryButton'
import InlineLinkButton from '@skilltype/ui/components/Button/InlineLinkButton'
import NotifyError from '@skilltype/ui/components/Notify/NotifyError'
import Progress from '@skilltype/ui/components/Progress/Progress'
import Tablet from '@skilltype/ui/components/Responsive/Tablet'
import MobileOnly from '@skilltype/ui/components/Responsive/MobileOnly'
import TextDivider from '@skilltype/ui/components/TextDivider/TextDivider'
import LogoSvg from '@skilltype/ui/assets/logo.svg'
import LogoIconSrc from '@skilltype/ui/assets/icon_dark_192.png'
import injectSheet from 'react-jss'
import classnames from 'classnames'
import styles from './styles'

/* eslint-disable jsx-a11y/anchor-is-valid */

const SignupModal = ({
  classes,
  onChange,
  onSubmit,
  onDismiss,
  showPassword,
  onTogglePassword,
  values,
  className,
  style,
  showInvalidInviteCode,
  errorMessage,
  unauthorizedErrorOnClose,
  showProgress,
  formContextRef,
  onModalSubmit,
  invitedUser,
}) => (
  <FullscreenModal
    onDismiss={onDismiss}
    hasEditableContent
    appElementId="root"
    showOkButton
    onOk={onModalSubmit}
    okButtonLabel="Sign Up"
    className={classnames(className, classes.signup)}
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
        Create an Account
      </PageHeading>
      <Content>
        <Form
          id="signup"
          onChange={onChange}
          values={values}
          onSubmit={onSubmit}
          disableSubmitUntilValid={false}
          disabled={showProgress}
          contextRef={formContextRef}
        >
          <Section style={{ padding: '1rem 0' }}>
            {/* TODO @jacob - Change NotifyError message based on returned error repsonse */}
            <NotifyError
              show={showInvalidInviteCode}
              onClose={unauthorizedErrorOnClose}
              id="login-notify"
            >
              {errorMessage}
            </NotifyError>
            <TextField
              id="firstName"
              label="First Name"
              required
              missingRequiredError="Please add your first name"
            />
            <TextField
              id="lastName"
              label="Last Name"
              required
              missingRequiredError="Please add your last name"
            />
            <ZipField
              id="zipcode"
              label="Zip Code"
              required
              missingRequiredError="Please enter your zipcode"
              style={{
                width: '100%',
              }}
            />
            <EmailField
              id="email"
              label="Work Email"
              placeholder="pb123@gonzaga.edu"
              required
              missingRequiredError="Please enter a valid work email address"
              disabled={Boolean(invitedUser)}
            />
            <EmailField
              id="secondaryEmail"
              label="Personal Email"
              missingRequiredError="Please enter your personal email address"
            />
            <PasswordField
              id="password"
              label="Password"
              showPassword={showPassword}
              onTogglePassword={onTogglePassword}
              required
              missingRequiredError="Please enter a password"
            />
            <TextField
              id="inviteCode"
              label="Invite Code"
              required
              missingRequiredError="An invite code is required to create an account"
              disabled={Boolean(invitedUser)}
            />
          </Section>
          <SubmitButton>Create Account</SubmitButton>
          <RawSection style={{ marginTop: '2rem', textAlign: 'center' }}>
            By creating an account you agree to the{' '}
            <InlineLinkButton
              href="https://skilltype.com/terms-of-use"
              external
              target="_blank"
            >
              Terms of Service
            </InlineLinkButton>
          </RawSection>
          <Section>
            <TextDivider style={{ margin: '0.8rem 0' }}>
              Already have an account?
            </TextDivider>
          </Section>
          <SecondaryButton href="/login" navigate>
            Log In
          </SecondaryButton>
        </Form>
        <Footer style={{ textAlign: 'center' }}>
          &copy; 2019, Skilltype LLC. All rights reserved.
        </Footer>
      </Content>
    </Page>
  </FullscreenModal>
)

export default injectSheet(styles)(SignupModal)
