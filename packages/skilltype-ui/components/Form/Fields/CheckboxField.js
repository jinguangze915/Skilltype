import React from 'react'
import FormField from '../FormField'
import Checkbox from '../../Checkbox/Checkbox'

const CheckboxField = ({ label, ...props }) => (
  <FormField {...props}>
    <Checkbox label={label} {...props} />
  </FormField>
)

export default CheckboxField
