import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import injectSheet from 'react-jss'
import { theme as defaultTheme, muiTheme } from './'
import globalStyles from './globalStyles'

const ThemedRoot = injectSheet(globalStyles)(
  ({ classes, children, ...others }) =>
    React.cloneElement(React.Children.only(children), {
      ...others,
      className: `${classes.root} ${children.props.className || ''}`,
    })
)

export default ({ theme = defaultTheme, children, ...others }) => (
  <MuiThemeProvider theme={muiTheme(theme)}>
    <ThemedRoot {...others}>{children}</ThemedRoot>
  </MuiThemeProvider>
)
