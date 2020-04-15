```js
initialState = {
  values: {},
}
;<Form
  id="submitButton"
  onChange={({ values }) => setState({ values })}
  values={state.values}
>
  <FormSection>
    <EmailInput required label="Email Address" id="emailAddr" />
    <PasswordInput required label="Password" id="pass" />
  </FormSection>
  <SubmitButton>Submit</SubmitButton>
</Form>
```
