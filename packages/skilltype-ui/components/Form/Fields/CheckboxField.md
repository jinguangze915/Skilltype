```jsx
initialState = {
  values: {
    cb2: true,
  },
}
;<Section>
  <Form
    id="checkboxForm"
    onChange={({ values }) => setState({ values })}
    values={state.values}
  >
    <FormSection>
      <CheckboxField id="cb1" label="Fresh air" />
      <CheckboxField id="cb2" label="Clean water" />
    </FormSection>
  </Form>
</Section>
```
