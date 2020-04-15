import React from 'react'
import FormField from '../FormField'
import ColorPicker from '../../ColorPicker/ColorPicker'

const ColorPickerField = ({ colors, ...props }) => (
  <FormField {...props}>
    <ColorPicker colors={colors} />
  </FormField>
)

export default ColorPickerField
