### Text only

```js
<FormSection>
  <MenuItem href="#about">About</MenuItem>
  <MenuItem href="#blog">Blog</MenuItem>
  <MenuItem href="#login">Login</MenuItem>
</FormSection>
```

### With Icons

```js
const ProfileIcon = require('../../assets/menu-icons/person.svg').default
const OrgsIcon = require('../../assets/menu-icons/business.svg').default
const SettingsIcon = require('../../assets/menu-icons/settings.svg').default
;<Content>
  <MenuItem href="#profile">
    <MenuItemIcon>
      <ProfileIcon />
    </MenuItemIcon>
    Profile
  </MenuItem>
  <MenuItem href="#orgs" active activeTheme="grey">
    <MenuItemIcon>
      <OrgsIcon />
    </MenuItemIcon>
    Organizations
  </MenuItem>
  <MenuItem href="#settings">
    <MenuItemIcon>
      <SettingsIcon />
    </MenuItemIcon>
    Settings
  </MenuItem>
</Content>
```
