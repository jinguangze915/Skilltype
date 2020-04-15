import React from 'react'
import { bool, string, func, shape } from 'prop-types'
import { withTheme } from 'react-jss'
import { profileThemes } from '@skilltype/ui/'
import Content from '@skilltype/ui/components/Viewport/Content'
import Form from '@skilltype/ui/components/Form/Form'
import FormSection from '@skilltype/ui/components/Section/FormSection'
import TextField from '@skilltype/ui/components/Form/Fields/TextField'
import PhoneField from '@skilltype/ui/components/Form/Fields/PhoneField'
import EmailField from '@skilltype/ui/components/Form/Fields/EmailField'
import ZipField from '@skilltype/ui/components/Form/Fields/ZipField'
import ColorPickerField from '@skilltype/ui/components/Form/Fields/ColorPickerField'
import SelectField from '@skilltype/ui/components/Form/Fields/SelectField'
import PrimaryTextButton from '@skilltype/ui/components/Button/PrimaryTextButton'
import SubmitButton from '@skilltype/ui/components/Button/SubmitButton'
import {
  gender,
  ethnicity,
  nationality,
  disability,
  veteran,
} from './settings.dropdown.data'
import InviteEmailForm from './InviteEmailForm'

// Get color names from profileTheme macro
const colors = Object.keys(profileThemes().user)

const missing = (field, verb = 'enter') =>
  `Please ${verb} ${
    field.toLowerCase().includes('email') ? 'a valid' : 'a'
  } ${field}`

class Settings extends React.Component {
  static propTypes = {
    userContext: shape({
      fetchProfile: func,
      saveProfile: func,
      fetchUser: func,
      saveUser: func,
      user: shape({
        firstName: string,
        lastName: string,
        email: string,
        secondaryEmail: string,
        cellPhoneNumber: string,
        tagline: string,
        city: string,
        state: string,
        country: string,
        zipcode: string,
        cardClor: string,
        gender: string,
        ethnicity: string,
        nationality: string,
        disability: bool,
        veteran: bool,
      }),
    }),
  }

  // Prety good use to merge props.userContext.user with this.state.values
  static getDerivedStateFromProps(props, state) {
    const userValues = props.userContext ? props.userContext.user : {}
    const inputValues = state.values
    const newValues = {
      ...userValues,
      ...inputValues,
    }
    // Default to not-specified for ethnicity and gender
    newValues.ethnicity = newValues.ethnicity ? newValues.ethnicity : null
    newValues.gender = newValues.gender ? newValues.gender : null

    // Default color to theme.lightGrey
    newValues.cardColor = newValues.cardColor ? newValues.cardColor : colors[0]

    return { values: newValues }
  }

  state = {
    values: {},
  }

  showPasswordModal = () => {
    this.props.navigate('./password')
  }

  handleChange = ({ values }) => {
    this.setState({ values })
  }

  handleSubmit = async (event, { isValid }) => {
    if (!isValid) return

    const { values } = this.state
    await this.props.userContext.saveSettings(
      values,
      'Settings have been updated',
      'Error updating settings. Please try again later.'
    )
  }

  render() {
    const { children } = this.props
    const { values } = this.state
    return (
      <Content>
        <Form
          id="settings"
          onChange={this.handleChange}
          values={values}
          onSubmit={this.handleSubmit}
          disableSubmitUntilValid={false}
          disabled={this.props.userContext && this.props.userContext.isSaving}
        >
          <FormSection>
            <TextField
              required
              id="firstName"
              label="First Name"
              placeholder="Libby"
              missingRequiredError={missing('first name')}
            />
            <TextField
              required
              id="lastName"
              label="Last Name"
              placeholder="Taylor"
              missingRequiredError={missing('last name')}
            />
            <EmailField
              required
              id="email"
              label="Work Email"
              placeholder="libby@libdot.com"
              missingRequiredError={missing('work email')}
            />
            <EmailField
              required
              id="secondaryEmail"
              label="Personal Email"
              placeholder="libby@skilltype.com"
              missingRequiredError={missing('personal email')}
            />
            <PhoneField
              id="cellPhoneNumber"
              label="Phone"
              placeholder="504 867 5309"
              missingRequiredError={missing('phone number')}
            />
            <PrimaryTextButton
              onClick={this.showPasswordModal}
              style={{ marginTop: '1.3rem' }}
            >
              Change Password
            </PrimaryTextButton>
          </FormSection>
          <FormSection>
            <TextField
              required
              id="tagline"
              label="Tagline"
              placeholder="E-Resources Librarian"
              inputProps={{
                inputProps: {
                  maxLength: '32',
                },
              }}
              missingRequiredError={missing('tagline')}
            />
            <ZipField
              required
              id="zipcode"
              label="Zip Code"
              placeholde="70115"
              missingRequiredError={missing('zipcode')}
            />
            <ColorPickerField
              required
              id="cardColor"
              label="Card Color"
              colors={colors}
              missingRequiredError={missing('card color')}
            />
          </FormSection>
          <FormSection>
            <SelectField
              id="gender"
              label="Gender"
              placeholder="Select"
              options={gender}
              inputProps={{
                isSearchable: false,
                isClearable: false,
              }}
              missingRequiredError={missing('gender', 'select')}
            />
            <SelectField
              id="ethnicity"
              label="Race or Ethnicity"
              placeholder="Select"
              options={ethnicity}
              inputProps={{
                isSearchable: false,
                isClearable: false,
              }}
              missingRequiredError={missing('ethnicity', 'select')}
            />
            <SelectField
              id="nationality"
              label="Nationality"
              options={nationality}
              missingRequiredError={missing('nationality', 'select')}
            />
            <SelectField
              id="disability"
              label="Disability"
              placeholder="Select"
              options={disability}
              inputProps={{
                isSearchable: false,
                isClearable: false,
              }}
              missingRequiredError={missing('disability', 'select')}
            />
            <SelectField
              id="veteran"
              label="Veteran Status"
              placeholder="Select"
              options={veteran}
              inputProps={{
                isSearchable: false,
                isClearable: false,
              }}
              missingRequiredError={missing('service status', 'select')}
            />
          </FormSection>
          <SubmitButton>Update Account</SubmitButton>
          {children}
        </Form>
        <InviteEmailForm />
      </Content>
    )
  }
}

export default withTheme(Settings)
