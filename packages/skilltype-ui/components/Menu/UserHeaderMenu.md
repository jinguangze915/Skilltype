```js
initialState = {
  pinned: false,
}
const title = 'Annie Bélanger'
;<Section>
  <AppMenuBar pinned={state.pinned} title={title}>
    <UserHeaderMenu appElementId="rsg-root" title={title} />
  </AppMenuBar>
  <Section newGroup>
    <label>
      Pinned
      <input
        type="checkbox"
        checked={state.pinned}
        onChange={e => setState({ pinned: e.target.checked })}
      />
    </label>
  </Section>
</Section>
```
