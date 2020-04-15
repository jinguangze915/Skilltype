```jsx
initialState = {
  values: {},
  showPassword: false,
}
togglePassword = () => setState({ showPassword: !state.showPassword })
;<Section>
  <Form
    id="passwordForm"
    onChange={({ values }) => setState({ values })}
    values={state.values}
  >
    <FormSection>
      <PasswordField
        id="pf1"
        label="Choose a Password"
        showPassword={state.showPassword}
        onTogglePassword={togglePassword}
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
