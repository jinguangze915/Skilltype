import React from 'react'
import FormField from '../FormField'
import ZipInput from '../../TextInput/ZipInput'

const ZipField = props => (
  <FormField {...props}>
    <ZipInput {...props} />
  </FormField>
)

export default ZipField
