```js
initialState = {
  pinned: false,
}
;<Section>
  <GuestMenuBar pinned={state.pinned}>Login</GuestMenuBar>
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
