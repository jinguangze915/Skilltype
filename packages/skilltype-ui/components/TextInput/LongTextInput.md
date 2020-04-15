```jsx
initialState = {
  value1: '',
  value2: `Hey!

{username} now uses Skilltype to manage professional development and training opportunities. Create an account today to add your skills and connect with organizations.

Keep being great,

Team Skilltype`,
}
;<FormSection>
  <Section>
    Empty with Placeholder
    <LongTextInput
      label="Invitation"
      placeholder="Write a message"
      value={state.value1}
      onChange={e => setState({ value1: e.target.value })}
    />
  </Section>
  <Section>
    Prefilled
    <LongTextInput
      label="Invitation (prefilled)"
      value={state.value2}
      onChange={e => setState({ value2: e.target.value })}
    />
  </Section>
</FormSection>
```
