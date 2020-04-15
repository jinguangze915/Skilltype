```js
initialState = {
  values: {
    showProgress: false,
  },
}
;<Section>
  {state.showProgress && <Progress />}
  <PrimaryButton
    onClick={() => setState({ showProgress: !state.showProgress })}
  >
    Show / Hide Progress
  </PrimaryButton>
</Section>
```
