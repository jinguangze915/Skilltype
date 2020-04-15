import { createMuiTheme } from '@material-ui/core/styles'
import merge from 'lodash.merge'

export default theme =>
  merge(
    createMuiTheme({
      typography: {
        useNextVariants: true,
        // Use the system font instead of the default Roboto font.
        fontFamily: theme.primaryFont,
        fontSize: theme.fontSizeNormal.replace('px', ''),
      },
      shape: {
        borderRadius: theme.borderRadius,
      },
    }),
    theme
  )
