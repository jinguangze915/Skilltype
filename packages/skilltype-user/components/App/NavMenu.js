import React from 'react'
import MenuContainer from '@skilltype/ui/components/Menu/MenuContainer'
import MenuItem from '@skilltype/ui/components/Menu/MenuItem'
import MenuItemIcon from '@skilltype/ui/components/Menu/MenuItemIcon'
import VerticalMenuBar from '@skilltype/ui/components/MenuBar/VerticalMenuBar'
import {
  withLocationContext,
  pathFromUri,
  trimmedPathFromUri,
} from '@skilltype/ui/components/Router/Router'
import MobileOnly from '@skilltype/ui/components/Responsive/MobileOnly'
import { show as showIntercom } from '@skilltype/services/lib/intercom'
import HomeIcon from '@skilltype/ui/assets/menu-icons/apps.svg'
import ProfileIcon from '@skilltype/ui/assets/menu-icons/person.svg'
import SettingsIcon from '@skilltype/ui/assets/menu-icons/settings.svg'
import FeedIcon from '@skilltype/ui/assets/menu-icons/school.svg'
import OrganizationsIcon from '@skilltype/ui/assets/menu-icons/business.svg'
import HelpIcon from '@skilltype/ui/assets/menu-icons/help.svg'

class NavMenu extends React.Component {
  onNavigate = e =>
    this.props.locationContext.navigate(pathFromUri(e.target.href))
  onCheckActive = props =>
    trimmedPathFromUri(props.href) ===
    trimmedPathFromUri(this.props.locationContext.location.pathname)
  render() {
    return (
      <VerticalMenuBar
        onNavigate={this.onNavigate}
        onCheckActive={this.onCheckActive}
        activeItemTheme="grey"
        style={this.props.style}
      >
        <MenuContainer transparent>
          <MenuItem href="/">
            <MenuItemIcon>
              <HomeIcon />
            </MenuItemIcon>
            Home
          </MenuItem>
          <MenuItem href="/profile">
            <MenuItemIcon>
              <ProfileIcon />
            </MenuItemIcon>
            Profile
          </MenuItem>
          <MenuItem href="/feed">
            <MenuItemIcon>
              <FeedIcon />
            </MenuItemIcon>
            Feed
          </MenuItem>
          <MenuItem href="/organizations">
            <MenuItemIcon>
              <OrganizationsIcon />
            </MenuItemIcon>
            Organizations
          </MenuItem>
          <MenuItem href="/settings">
            <MenuItemIcon>
              <SettingsIcon />
            </MenuItemIcon>
            Settings
          </MenuItem>
          <MobileOnly>
            <MenuItem href="/chat" onClick={showIntercom}>
              <MenuItemIcon>
                <HelpIcon />
              </MenuItemIcon>
              Help
            </MenuItem>
          </MobileOnly>
        </MenuContainer>
      </VerticalMenuBar>
    )
  }
}

export default withLocationContext(NavMenu)
