import React, { Component } from 'react'
import Form from '@skilltype/ui/components/Form/Form'
import FormSection from '@skilltype/ui/components/Section/FormSection'
import EmailField from '@skilltype/ui/components/Form/Fields/EmailField'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import SectionHeading from '@skilltype/ui/components/Heading/SectionHeading'
import { validateEmail } from '@skilltype/data/utils'
import { withNotifyContext } from '@skilltype/ui/components/Notify/NotifyProvider'
import injectSheet from 'react-jss'
import styles from './styles'
import { withUserContext } from '../User/UserProvider'

class InviteEmailForm extends Component {
  state = {
    values: {},
  }

  handleChange = ({ values }) => {
    this.setState({ values })
  }

  handleSubmit = (e, { isValid }) => {
    if (!isValid) return
    const { values } = this.state

    const areAllEmailsValid = values.emailsCommaSeparated
      .split(',')
      .every(validateEmail)

    if (areAllEmailsValid) {
      this.props.userContext.inviteUsers(values)
      this.setState({ values: {} })
    } else {
      this.props.notifyError('Invalid Email: Make sure there are no typos')
      this.props.notifyClose(3000)
    }
  }

  render() {
    const { values } = this.state
    const { classes } = this.props

    return (
      <React.Fragment>
        <SectionHeading className={classes.title}>
          Invite Colleagues
        </SectionHeading>
        <Form
          id="invite-form"
          values={values}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          disableSubmitUntilValid={false}
        >
          <FormSection>
            <EmailField
              id="emailsCommaSeparated"
              label="Email(s)"
              placeholder=""
              helperText="Send one or more invites. Please separate multiple addresses with commas"
              className={classes.helperText}
              required
            />
          </FormSection>
          <SubmitButton>Send Invites</SubmitButton>
        </Form>
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(
  withNotifyContext(withUserContext(InviteEmailForm))
)
