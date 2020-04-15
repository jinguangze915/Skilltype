import React from 'react'
import FormField from '../FormField'
import Select from '../../Select/Select'

const SelectField = ({ options, searchable, ...props }) => (
  <FormField {...props}>
    <Select options={options} searchable={searchable} {...props} />
  </FormField>
)

export default SelectField
