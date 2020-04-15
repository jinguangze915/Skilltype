```jsx
initialState = {
  values: {
    lf2: `Hey!

  {username} now uses Skilltype to manage professional development and training opportunities. Create an account today to add your skills and connect with organizations.

  Keep being great,

  Team Skilltype`,
  },
  inline: false,
}
;<Section>
  <Form
    id="longTextForm"
    onChange={({ values }) => setState({ values })}
    values={state.values}
  >
    <FormSection>
      <LongTextField
        id="lf1"
        label="Long Text"
        placeholder="Write a message"
        helperText="Max 1000 characters"
        inline={state.inline}
      />
      <LongTextField
        id="lf2"
        label="Long Text (prefilled)"
        helperText="Max 1000 characters"
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
