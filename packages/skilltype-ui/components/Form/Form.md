### Basic demo

```js
initialState = {
  values: {},
}
;<Form onChange={({ values }) => setState({ values })} values={state.values}>
  <FormSection>
    <TextInput id="first" label="First Name" />
    <TextInput id="last" label="Last Name" />
  </FormSection>
  <SubmitButton>Submit</SubmitButton>
</Form>
```

### Required field validation

The `disableSubmitUntilValid` prop defaults to `true`, which means any `<SubmitButton />` will be disabled until all required fields have a non-empty value.

```js
initialState = {
  values: {},
  showProgress: false,
}
;<Page centerContent centerSelf>
  {state.showProgress && <Progress />}
  <PageHeading style={{ margin: '0.5em 0 1em', textAlign: 'center' }}>
    Signup
  </PageHeading>
  <Content>
    <Form
      onSubmit={(e, { isValid }) => isValid && setState({ showProgress: true })}
      disabled={state.showProgress}
      onChange={({ values }) => setState({ values })}
      values={state.values}
    >
      <FormSection>
        <TextInput id="first" label="First Name" required />
        <TextInput id="last" label="Last Name" required />
      </FormSection>
      <SubmitButton disabled={state.showProgress}>Next</SubmitButton>
    </Form>
  </Content>
</Page>
```

If we set `disableSubmitUntilValid` to `false`, the `error` prop is set to the `missingRequiredError` value for required fields that have an empty value.

```js
initialState = {
  values: {},
  showProgress: false,
}
;<Page centerContent centerSelf>
  {state.showProgress && <Progress />}
  <PageHeading style={{ margin: '0.5em 0 1em', textAlign: 'center' }}>
    Signup
  </PageHeading>
  <Content>
    <Form
      onSubmit={(e, { isValid }) => isValid && setState({ showProgress: true })}
      disabled={state.showProgress}
      onChange={({ values }) => setState({ values })}
      values={state.values}
      disableSubmitUntilValid={false}
    >
      <FormSection>
        <EmailInput
          id="email"
          label="Email Address"
          required
          missingRequiredError="Please enter an email address"
        />
      </FormSection>
      <SubmitButton disabled={state.showProgress}>Next</SubmitButton>
    </Form>
  </Content>
</Page>
```

### Propagating form updates

By default, an `onChange` event will not trigger updates (re-renders) on any field _except_ the one that changed.
We can use the `alwaysUpdateOnFormChange` prop to force an update.

```js
initialState = {
  values: {},
  updateCount: 0,
}
;<Content>
  <Section style={{ marginBottom: '20px' }}>
    <PrimaryButton
      onClick={() => setState({ updateCount: state.updateCount + 1 })}
      style={{ marginBottom: '10px' }}
    >
      Update Count
    </PrimaryButton>
    (This triggers an update to state without a field change, so all counts should
    update)
  </Section>
  <Form
    onSubmit={() => setState({ showProgress: true })}
    onChange={({ values }) =>
      setState({ values, updateCount: state.updateCount + 1 })
    }
    values={state.values}
  >
    <FormSection>
      <Section>This should always update: {state.updateCount}</Section>
      <EmailInput id="email" label="Email" />
      <TextInput
        id="text0"
        label={`This should only update when this field changes: ${
          state.updateCount
        }`}
      />
      <TextInput
        id="text1"
        label={`this should always update: ${state.updateCount}`}
        alwaysUpdateOnFormChange
      />
    </FormSection>
  </Form>
</Content>
```

### Disabling

```js
initialState = {
  values: {
    first: 'Jordi',
  },
}
;<Section>
  <Form
    values={state.values}
    onChange={({ values }) => setState({ values })}
    disabled={state.formIsDisabled}
  >
    <FormSection>
      <TextInput
        id="first"
        label="First Name"
        disabled={state.values.disableTextInput}
        alwaysUpdateOnFormChange
      />
      <TextInput id="last" label="Last Name" />
      <Checkbox id="disableTextInput" label="Disable Text Input" />
    </FormSection>
  </Form>
  <Checkbox
    id="formIsDisabled"
    label="Disable Form"
    value={state.formIsDisabled}
    onChange={e => setState({ formIsDisabled: e.target.value })}
  />
</Section>
```

### Error States

```js
initialState = {
  values: {
    age: 'twenty',
  },
}
const isZipValid = () => {
  if (state.values.zip.match(/[^0-9]/)) {
    setState({ zipError: 'Nothing but a number, please' })
  } else {
    setState({ zipError: '' })
  }
}
;<Form
  onChange={({ values }) => setState({ values })}
  values={state.values}
  disableSubmitUntilValid={false}
  onSubmit={(e, { isValid }) => isValid && isZipValid()}
>
  <FormSection>
    <TextInput id="age" label="Age" error="Nothing but a number, please" />
    <TextInput
      id="zip"
      label="Zip Code"
      required
      missingRequiredError="Please enter a zip code"
      error={state.zipError}
    />
  </FormSection>
  <SubmitButton>Next</SubmitButton>
</Form>
```
