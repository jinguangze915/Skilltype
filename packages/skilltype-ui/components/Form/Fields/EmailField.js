import React from 'react'
import FormField from '../FormField'
import EmailInput from '../../TextInput/EmailInput'

const EmailField = props => (
  <FormField {...props}>
    <EmailInput placeholder={props.placeholder} />
  </FormField>
)

export default EmailField
