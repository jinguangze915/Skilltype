```jsx
initialState = {
  showPassword: false,
  value: '',
}
togglePassword = () => setState({ showPassword: !state.showPassword })
;<FormSection>
  <PasswordInput
    showPassword={state.showPassword}
    onTogglePassword={togglePassword}
    onChange={e => setState({ value: e.target.value })}
    value={state.value}
  />
</FormSection>
```
