import React from 'react'
import FormField from '../FormField'
import TextInput from '../../TextInput/TextInput'

const TextField = props => (
  <FormField {...props}>
    <TextInput />
  </FormField>
)

export default TextField
