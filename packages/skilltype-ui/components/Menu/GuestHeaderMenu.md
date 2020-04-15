```js
initialState = {
  pinned: false,
}
;<Section>
  <MenuBar pinned={state.pinned}>
    <GuestHeaderMenu appElementId="rsg-root">
      <GuestHeaderMenuItem href="#about">About</GuestHeaderMenuItem>
      <GuestHeaderMenuItem href="#blog">Blog</GuestHeaderMenuItem>
      <GuestHeaderMenuItem href="#login">Login</GuestHeaderMenuItem>
    </GuestHeaderMenu>
  </MenuBar>
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
