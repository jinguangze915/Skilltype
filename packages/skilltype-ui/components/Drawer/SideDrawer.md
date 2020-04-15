```js
const loremIpsum = require('lorem-ipsum')
initialState = {
  open: false,
}
onClose = () => setState({ open: false })
;<Content>
  <PrimaryButton onClick={() => setState({ open: true })}>
    Open Drawer
  </PrimaryButton>
  <SideDrawer open={state.open} onClose={onClose}>
    <SideDrawerHeader onClose={onClose} />
    <SideDrawerContent style={{ padding: '15px' }}>
      {loremIpsum({ format: 'text', units: 'paragraphs', count: 10 })}
    </SideDrawerContent>
  </SideDrawer>
</Content>
```
