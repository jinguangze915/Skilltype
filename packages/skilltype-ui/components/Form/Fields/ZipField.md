```jsx
initialState = {
  values: {
    zf3: '80303',
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
      <ZipField
        id="zf1"
        label="Zip Code"
        helperText="Numbers Only"
        inline={state.inline}
      />
      <ZipField
        id="zf2"
        label="Zip Code with Placeholder override"
        placeholder="11221"
        helperText="Numbers Only"
        inline={state.inline}
      />
      <ZipField
        id="zf3"
        label="Zip Code with value prepopulated"
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
