```js
initialState = {
  checked: false,
}
;<FormSection>
  <Radio
    label="Gaga"
    id="radio1"
    checked={state.checked}
    onClick={() => setState({ checked: true })}
  />
</FormSection>
```
