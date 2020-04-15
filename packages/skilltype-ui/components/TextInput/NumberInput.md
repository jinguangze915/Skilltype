```jsx
initialState={
  value1: undefined,
  value2: undefined,
  value3: 1234,
}
;<FormSection>
  <Section>
    Normal
    <NumberInput
      onChange={e => setState({ value1: e.target.value })}
      value={state.value1}
    />
  </Section>
  <Section>
    Number with placeholder override
    <NumberInput
      placeholder="450"
      onChange={e => setState({ value2: e.target.value })}
      value={state.value2}
    />
  </Section>
  <Section>
    Number with value pre-populated
    <NumberInput
      onChange={e => setState({ value2: e.target.value })}
      value={state.value3}
    />
  </Section>
</FormSection>
```
