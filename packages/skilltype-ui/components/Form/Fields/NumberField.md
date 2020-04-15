```jsx
initialState = {
  values: {
    num3: '100',
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
      <NumberField
        id="num1"
        label="Number"
        helperText="Numbers Only"
        inline={state.inline}
      />
      <NumberField
        id="num2"
        label="Number with placeholder override"
        placeholder="21"
        helperText="Numbers Only"
        inline={state.inline}
      />
      <NumberField
        id="num3"
        label="Number with pre-populated value"
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
