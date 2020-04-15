import React from 'react'
import { ThemeProvider } from '@skilltype/ui'

export const LoginViewportDecorator = storyFn => (
  <ThemeProvider>{storyFn()}</ThemeProvider>
)
