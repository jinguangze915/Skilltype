```jsx
initialState = {
  value: '',
}
;<FormSection>
  <TextInput
    placeholder="This is a placeholder"
    onChange={e => setState({ value: e.target.value })}
    value={state.value}
  />
</FormSection>
```
