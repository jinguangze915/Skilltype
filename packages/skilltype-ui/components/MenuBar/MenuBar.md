Regular buttons as children. Note horizontal arrow trap.

```js
<Section>
  <MenuBar>
    <PrimaryButton style={{ margin: '5px' }}>❤️</PrimaryButton>
    <PrimaryButton style={{ margin: '5px' }}>🔥</PrimaryButton>
    <PrimaryButton style={{ margin: '5px' }}>🙈</PrimaryButton>
  </MenuBar>
</Section>
```

Menu components as children. Note default behavior is to keep menus open when moving horizontally.

```js
const withMenuBarContext = require('./MenuBar').withMenuBarContext
const MenuBarMenu = withMenuBarContext(({ children, label, ...others }) => (
  <Menu
    alwaysCollapse
    renderOpener={({ buttonProps }) => (
      <PrimaryTextButton {...buttonProps} aria-label={label}>
        {label}
      </PrimaryTextButton>
    )}
    {...others}
  >
    {children}
  </Menu>
))
;<Section>
  <MenuBar>
    <MenuBarMenu label="Menu One">
      <MenuItem href="#about">About</MenuItem>
      <MenuItem href="#blog">Blog</MenuItem>
      <MenuItem href="#login">Login</MenuItem>
    </MenuBarMenu>
    <MenuBarMenu label="Menu Two">
      <MenuItem href="#cities">Cities</MenuItem>
      <MenuItem href="#states">States</MenuItem>
      <MenuItem href="#countries">Countries</MenuItem>
    </MenuBarMenu>
    <MenuBarMenu label="Menu Three">
      <MenuItem href="#dollars">USD</MenuItem>
      <MenuItem href="#euros">EUR</MenuItem>
      <MenuItem href="#pounds">GBP</MenuItem>
    </MenuBarMenu>
  </MenuBar>
</Section>
```
