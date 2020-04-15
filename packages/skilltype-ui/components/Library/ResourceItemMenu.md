```js
initialState = {
  isSaved: false,
  infoIsVisible: false,
}
;<Section style={{ width: '150px', backgroundColor: 'white' }}>
  <ResourceItemMenu
    onSaveClick={() => setState({ isSaved: !state.isSaved })}
    isSaved={state.isSaved}
    infoIsVisible={state.infoIsVisible}
    onInfoClick={() => setState({ infoIsVisible: !state.infoIsVisible })}
  />
</Section>
```
