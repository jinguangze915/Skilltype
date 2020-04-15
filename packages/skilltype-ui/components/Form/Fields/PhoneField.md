```jsx
initialState = {
  values: {
    pf3: '2038675309',
  },
  inline: false,
}
;<Section>
  <Form
    id="zipForm"
    onChange={({ values }) => setState({ values })}
    values={state.values}
  >
    <FormSection>
      <PhoneField
        id="pf1"
        label="Phone"
        helperText="Numbers Only"
        inline={state.inline}
      />
      <PhoneField
        id="pf2"
        label="Phone with Placeholder override"
        placeholder="(303) 555-1212"
        helperText="Numbers Only"
        inline={state.inline}
      />
      <PhoneField
        id="pf3"
        label="Phone with value prepopulated"
        helperText="Numbers Only"
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
