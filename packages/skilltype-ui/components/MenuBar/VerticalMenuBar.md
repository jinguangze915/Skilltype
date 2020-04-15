```js
initialState = {
  activeId: '',
}
;<Section>
  <VerticalMenuBar
    onNavigate={(e, { id }) => setState({ activeId: id })}
    onCheckActive={props => props.id === state.activeId}
  >
    <MenuContainer>
      <MenuSection title="Admin Panel">
        <SegmentedMenuItem id="about">About</SegmentedMenuItem>
        <SegmentedMenuItem id="blog">Blog</SegmentedMenuItem>
        <SegmentedMenuItem id="login">Login</SegmentedMenuItem>
      </MenuSection>
    </MenuContainer>
  </VerticalMenuBar>
</Section>
```
