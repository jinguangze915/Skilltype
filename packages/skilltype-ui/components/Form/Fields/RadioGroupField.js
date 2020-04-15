import React from 'react'
import FormField from '../FormField'
import RadioGroup, { HORIZONTAL } from '../../Radio/RadioGroup'

const RadioGroupField = ({
  label,
  children,
  inline,
  orientation,
  ...props
}) => (
  <FormField
    label={label}
    inline={inline}
    {...props}
    style={{
      ...(inline ? {} : { marginTop: '0.8em' }),
      marginBottom: orientation === HORIZONTAL ? '1em' : '0.6em',
    }}
  >
    <RadioGroup orientation={orientation} {...props}>
      {children}
    </RadioGroup>
  </FormField>
)

export default RadioGroupField
