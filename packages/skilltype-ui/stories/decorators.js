import React from 'react'
import Viewport from '../components/Viewport/ThemedViewport'
import FullscreenModal from '../components/Modal/FullscreenModal'

export const ViewportDecorator = storyFn => (
  <Viewport fullscreen>{storyFn()}</Viewport>
)

export const ModalDecorator = storyFn => (
  <Viewport fullscreen>
    <FullscreenModal standalone>{storyFn()}</FullscreenModal>
  </Viewport>
)
