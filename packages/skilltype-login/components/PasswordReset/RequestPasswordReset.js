import React from 'react'
import Content from '@skilltype/ui/components/Viewport/Content'
import Footer from '@skilltype/ui/components/Footer/Footer'
import Form from '@skilltype/ui/components/Form/Form'
import EmailField from '@skilltype/ui/components/Form/Fields/EmailField'
import Section from '@skilltype/ui/components/Section/Section'
import PageHeading from '@skilltype/ui/components/Heading/PageHeading'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import SecondaryButton from '@skilltype/ui/components/Button/SecondaryButton'
import TextDivider from '@skilltype/ui/components/TextDivider/TextDivider'

const RequestPasswordReset = ({ onChange, values, onSubmit, showProgress }) => (
  <React.Fragment>
    <PageHeading style={{ margin: '0.8em 0', textAlign: 'center' }}>
      {'Reset Your Password'}
    </PageHeading>
    <Content>
      <Form
        id="password-reset-form"
        onChange={onChange}
        values={values}
        onSubmit={onSubmit}
        disableSubmitUntilValid={false}
        disabled={showProgress}
      >
        <Section style={{ padding: '1rem 0' }}>
          <EmailField
            id="email"
            label="Email Address"
            required
            missingRequiredError="Please enter an email address"
          />
        </Section>
        <SubmitButton>Send Me Instructions</SubmitButton>
      </Form>
      <Section>
        <TextDivider style={{ margin: '0.8rem 0' }}>
          Already have an account?
        </TextDivider>
      </Section>
      <SecondaryButton href="/login" navigate>
        Log In
      </SecondaryButton>
      <Footer style={{ textAlign: 'center' }}>
        &copy; 2019, Skilltype LLC. All rights reserved.
      </Footer>
    </Content>
  </React.Fragment>
)
export default RequestPasswordReset
