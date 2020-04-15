```jsx
initialState = {
  values: {
    tf4: 'Hello Zaphod',
    tf5: 'Too long',
  },
  inline: false,
}
;<Section>
  <Form
    id="textField1"
    onChange={({ values }) => setState({ values })}
    values={state.values}
  >
    <FormSection>
      <TextField
        id="tf1"
        label="First Name"
        helperText="Required"
        placeholder="Zaphod"
        inline={state.inline}
      />
      <TextField
        inline={state.inline}
        id="tf2"
        label="Last Name"
        placeholder="Beeblebrox"
      />
      <TextField
        inline={state.inline}
        id="tf3"
        label="Always Errors"
        error="Error message here"
      />
      <TextField inline={state.inline} id="tf4" label="Fixed Value" />
      <TextField
        inline={state.inline}
        id="tf5"
        label="Very long label with way too many words"
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
