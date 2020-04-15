import React from 'react'
import AppMenuBar from '@skilltype/ui/components/MenuBar/AppMenuBar'
import UserHeaderMenu from '@skilltype/ui/components/Menu/UserHeaderMenu'
import MobileOnly from '@skilltype/ui/components/Responsive/MobileOnly'
import { isMobile } from '@skilltype/ui/lib/mediaQuery'
import SideDrawer from '@skilltype/ui/components/Drawer/SideDrawer'
import SideDrawerHeader from '@skilltype/ui/components/Drawer/SideDrawerHeader'
import SideDrawerFooter from '@skilltype/ui/components/Drawer/SideDrawerFooter'
import SideDrawerContent from '@skilltype/ui/components/Drawer/SideDrawerContent'
import {
  withLocationContext,
  pathFromUri,
} from '@skilltype/ui/components/Router/Router'
import { userIsRoleSkilltypeAdmin, withUserContext } from '../User/UserProvider'
import NavMenu from './NavMenu'

class Header extends React.Component {
  state = {
    drawerIsOpen: false,
  }
  onNavigateHome = () => this.props.locationContext.navigate('/')
  onNavigate = e =>
    this.props.locationContext.navigate(pathFromUri(e.target.href))
  onCloseDrawer = () => this.setState({ drawerIsOpen: false })
  onOpenDrawer = () => this.setState({ drawerIsOpen: true })

  render() {
    const { title, children, userContext } = this.props
    const { drawerIsOpen } = this.state
    const { firstName, lastName } = userContext.user
    const menuTitle = `${firstName} ${lastName}`
    return (
      <AppMenuBar
        title={title}
        pinned
        height={50}
        onLogoClick={isMobile() ? this.onOpenDrawer : this.onNavigateHome}
      >
        {children}
        <UserHeaderMenu
          id="user-header-menu"
          title={menuTitle}
          onNavigate={this.onNavigate}
          isAdmin={userIsRoleSkilltypeAdmin(userContext.user)}
        />
        <MobileOnly>
          <SideDrawer open={drawerIsOpen} onClose={this.onCloseDrawer}>
            <SideDrawerHeader onClose={this.onCloseDrawer} />
            <SideDrawerContent>
              <NavMenu style={{ margin: '5px 0' }} />
            </SideDrawerContent>
            <SideDrawerFooter />
          </SideDrawer>
        </MobileOnly>
      </AppMenuBar>
    )
  }
}

export default withLocationContext(withUserContext(Header))
