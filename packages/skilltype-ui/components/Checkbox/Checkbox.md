```jsx
initialState = {
  A: false,
  B: false,
  C: false
}
;<RaisedSection contentPadding>
  <Checkbox
    id="agree"
    label="Do you agree"
    value={state.A}
    onChange={(e) => setState({ A: e.target.value })}
  />
  <Checkbox
    id="help"
    label="Help informaation"
    value={state.B}
    helperText="Required"
    onChange={(e) => setState({ B: e.target.value })}
  />
  <Checkbox
    id="error"
    label="Something went wrong"
    value={state.C}
    error="Some string"
    onChange={(e) => setState({ C: e.target.value })}
  />
  <Checkbox
    id="disbaled"
    label="Disbaled, can't click"
    disabled={true}
    onChange={(e) => {}}
  />
</RaisedSection>
```
