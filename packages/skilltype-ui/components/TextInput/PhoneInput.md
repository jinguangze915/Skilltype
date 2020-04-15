```jsx
initialState = {
  value1: '',
  value2: '',
  value3: '2038675309',
}
;<FormSection>
  <Section>
    Normal
    <PhoneInput
      onChange={e => setState({ value1: e.target.value })}
      value={state.value1}
    />
  </Section>
  <Section>
    Phone with placeholder override
    <PhoneInput
      placeholder="(303) 555-1212"
      onChange={e => setState({ value2: e.target.value })}
      value={state.value2}
    />
  </Section>
  <Section>
    Phone with value prepopulated
    <PhoneInput
      onChange={e => setState({ value2: e.target.value })}
      value={state.value3}
    />
  </Section>
</FormSection>
```
