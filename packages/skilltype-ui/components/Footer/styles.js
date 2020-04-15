import { theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  footer: {
    margin: '25px 0',
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
  },
})
