import React from 'react'
import ThemedViewport from '@skilltype/ui/components/Viewport/ThemedViewport'
import GuestMenuBar from '@skilltype/ui/components/MenuBar/GuestMenuBar'
import GuestHeaderMenu from '@skilltype/ui/components/Menu/GuestHeaderMenu'
import GuestHeaderMenuItem from '@skilltype/ui/components/Menu/GuestHeaderMenuItem'
import Footer from '@skilltype/ui/components/Footer/Footer'

export const GuestViewportDecorator = storyFn => (
  <ThemedViewport fullscreen centerContent>
    <GuestMenuBar height={51} pinned>
      <GuestHeaderMenu>
        <GuestHeaderMenuItem href="#about">About</GuestHeaderMenuItem>
        <GuestHeaderMenuItem href="#blog">Blog</GuestHeaderMenuItem>
        <GuestHeaderMenuItem href="#login">Login</GuestHeaderMenuItem>
      </GuestHeaderMenu>
    </GuestMenuBar>
    {storyFn()}
    <Footer>Skilltype © 2018</Footer>
  </ThemedViewport>
)
