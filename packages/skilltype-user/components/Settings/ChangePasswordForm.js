import React from 'react'
import Form from '@skilltype/ui/components/Form/Form'
import Section from '@skilltype/ui/components/Section/Section'
import PasswordField from '@skilltype/ui/components/Form/Fields/PasswordField'
import { withUserContext } from '../User/UserProvider'

class ChangePasswordForm extends React.Component {
  render() {
    const { values } = this.props

    return (
      <Form
        id="password"
        values={values}
        onChange={this.props.handleChange}
        onSubmit={this.props.handleSubmit}
        disableSubmitUntilValid={false}
        disabled={this.props.userContext && this.props.userContext.isSaving}
        contextRef={this.setContextRef}
      >
        <Section>
          <PasswordField
            required
            id="currentPassword"
            label="Current Password"
            missingRequiredError="Please enter your current password"
          />
          <PasswordField
            required
            id="newPassword"
            label="New Password"
            missingRequiredError="Enter a new password"
          />
          <PasswordField
            required
            id="verifyNewPassword"
            label="Verify New Password"
            missingRequiredError="Please verify your new password"
          />
        </Section>
      </Form>
    )
  }
}
export default withUserContext(ChangePasswordForm)
