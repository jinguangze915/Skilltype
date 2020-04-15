/* @flow */

import React from 'react'
import ThemedViewport from '@skilltype/ui/components/Viewport/ThemedViewport'
import GuestMenuBar from '@skilltype/ui/components/MenuBar/GuestMenuBar'
import GuestHeaderMenu from '@skilltype/ui/components/Menu/GuestHeaderMenu'
import GuestHeaderMenuItem from '@skilltype/ui/components/Menu/GuestHeaderMenuItem'
import Footer from '@skilltype/ui/components/Footer/Footer'
import { theme } from '@skilltype/ui'
import Home from './components/Home/Home'

const _theme = {
  ...theme,
  '@global body': {
    backgroundColor: theme.bgColorLight,
  },
}

const App = () => (
  <ThemedViewport theme={_theme} fullscreen centerContent>
    <GuestMenuBar height={51} pinned>
      <GuestHeaderMenu>
        <GuestHeaderMenuItem href="https://skilltype.squarespace.com" external>
          About
        </GuestHeaderMenuItem>
        <GuestHeaderMenuItem
          href="https://skilltype.squarespace.com/blog"
          external
        >
          Blog
        </GuestHeaderMenuItem>
        <GuestHeaderMenuItem href="#login">Login</GuestHeaderMenuItem>
      </GuestHeaderMenu>
    </GuestMenuBar>
    <Home />
    <Footer>Skilltype © 2018</Footer>
  </ThemedViewport>
)

export default App
