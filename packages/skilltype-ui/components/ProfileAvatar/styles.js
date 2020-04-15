import {
  macros,
  theme as defaultTheme,
  profileThemes,
} from '../../shared-styles'

export default (theme = defaultTheme) => ({
  profileAvatar: {
    ...macros.centerBoth(),
    borderBottom: `1px solid ${theme.mediumGrey}`,
    fontFamily: theme.primaryFont,
    backgroundColor: theme.white,
    color: theme.lightGrey,
    fontWeight: 'bold',
    fontSize: '64px',
  },
  ...profileThemes(theme).all,
})
