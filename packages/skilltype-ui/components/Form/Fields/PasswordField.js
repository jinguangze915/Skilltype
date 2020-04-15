import React from 'react'
import FormField from '../FormField'
import PasswordInput from '../../TextInput/PasswordInput'

const PasswordField = ({ onTogglePassword, showPassword, ...props }) => (
  <FormField {...props}>
    <PasswordInput
      onTogglePassword={onTogglePassword}
      showPassword={showPassword}
    />
  </FormField>
)

export default PasswordField
