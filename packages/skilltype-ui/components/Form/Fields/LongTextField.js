import React from 'react'
import FormField from '../FormField'
import LongTextInput from '../../TextInput/LongTextInput'

const LongTextField = props => (
  <FormField {...props}>
    <LongTextInput />
  </FormField>
)

export default LongTextField
