```jsx
initialState = {
  value1: '',
  value2: '',
  value3: '80303',
}
;<FormSection>
  <Section>
    Normal
    <ZipInput
      onChange={e => setState({ value1: e.target.value })}
      value={state.value1}
    />
  </Section>
  <Section>
    Zip with placeholder override
    <ZipInput
      placeholder="11221"
      onChange={e => setState({ value2: e.target.value })}
      value={state.value2}
    />
  </Section>
  <Section>
    Zip with value prepopulated
    <ZipInput
      onChange={e => setState({ value2: e.target.value })}
      value={state.value3}
    />
  </Section>
</FormSection>
```
