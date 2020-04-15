```jsx
initialState = {
  values: {
    ef3: 'arthur@dent.name',
  },
  inline: false,
}
;<Section>
  <Form
    id="emailForm"
    onChange={({ values }) => setState({ values })}
    values={state.values}
  >
    <FormSection>
      <EmailField
        id="ef1"
        label="Email Address"
        helperText="Required"
        inline={state.inline}
      />
      <EmailField
        id="ef2"
        label="Email Address with Placeholder override"
        placeholder="zaphod@broxmail.com"
        helperText="Required"
        inline={state.inline}
      />
      <EmailField
        label="Email Address with value prepopulated"
        id="ef3"
        helperText="Required"
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
