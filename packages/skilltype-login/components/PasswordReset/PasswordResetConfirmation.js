import React from 'react'
import Content from '@skilltype/ui/components/Viewport/Content'
import Footer from '@skilltype/ui/components/Footer/Footer'
import Section from '@skilltype/ui/components/Section/Section'
import PageHeading from '@skilltype/ui/components/Heading/PageHeading'
import SecondaryButton from '@skilltype/ui/components/Button/SecondaryButton'
import TextDivider from '@skilltype/ui/components/TextDivider/TextDivider'
import LogoSvg from '@skilltype/ui/assets/logo.svg'
import { hideEmail } from '../../../skilltype-data/utils'

const PasswordResetConfirmation = ({ values: { email } }) => (
  <React.Fragment>
    <PageHeading style={{ margin: '0.8em 0', textAlign: 'center' }}>
      <LogoSvg /> <br />
      Password Reset
    </PageHeading>
    <Content>
      <Section>
        {`We sent an email to ${hideEmail(
          email
        )}. Click the link in the email to
        reset your password. If you don't see the email, check other places it
        might be like your junk, spam, social or other folders`}
      </Section>
      <Section>
        <TextDivider style={{ margin: '0.8rem 0' }}>
          Already have an account?
        </TextDivider>
      </Section>
      <SecondaryButton href="/login" navigate>
        Go Back Home
      </SecondaryButton>
      <Footer style={{ textAlign: 'center' }}>
        &copy; 2019, Skilltype LLC. All rights reserved.
      </Footer>
    </Content>
  </React.Fragment>
)

export default PasswordResetConfirmation
