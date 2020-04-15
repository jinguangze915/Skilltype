```jsx
initialState = {
  value1: '',
  value2: '',
  value3: 'arthur@dent.name',
}
;<FormSection>
  <Section>
    Normal
    <EmailInput
      onChange={e => setState({ value1: e.target.value })}
      value={state.value1}
    />
  </Section>
  <Section>
    Email with placeholder override
    <EmailInput
      placeholder="zaphod@broxmail.com"
      onChange={e => setState({ value2: e.target.value })}
      value={state.value2}
    />
  </Section>
  <Section>
    Email with value prepopulated
    <EmailInput
      onChange={e => setState({ value2: e.target.value })}
      value={state.value3}
    />
  </Section>
</FormSection>
```
