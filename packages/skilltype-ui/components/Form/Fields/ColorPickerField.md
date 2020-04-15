```js
const profileThemes = require('../../../shared-styles/profileThemes.js').default()
const colors = Object.keys(profileThemes.all)
const initialState = {
  values: {
    default: '',
    selected: '#ff8336',
    helperText: '',
    error: '',
  },
}
;<Section>
  <Form
    id="checkboxForm"
    onChange={({ values }) => setState({ values })}
    values={state.values}
  >
    <FormSection>
      <ColorPickerField
        label="Default"
        colors={colors}
        id="default"
        inline={state.inline}
      />
      <ColorPickerField
        label="Selected"
        colors={colors}
        id="selected"
        inline={state.inline}
      />
      <ColorPickerField
        label="Helper Text"
        helperText="Choose a color"
        colors={colors}
        id="helperText"
        inline={state.inline}
      />
      <ColorPickerField
        label="Error"
        colors={colors}
        id="error"
        error="This field is required"
        inline={state.inline}
      />
      <ColorPickerField
        disabled
        label="Disbled"
        colors={colors}
        id="disabled"
        inline={state.inline}
      />
    </FormSection>
  </Form>
  <Checkbox
    value={state.inline}
    onChange={e => setState({ inline: e.target.value })}
    label="Inline"
  />
</Section>
```
