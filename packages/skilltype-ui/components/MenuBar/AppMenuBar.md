```js
initialState = {
  pinned: false,
}
;<Section>
  <AppMenuBar
    title="Annie Bélanger"
    onLogoClick={() => alert('logo clicked')}
    pinned={state.pinned}
  >
    Logout
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
