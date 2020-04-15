import { theme as defaultTheme } from '@skilltype/ui/shared-styles'

export default (theme = defaultTheme) => ({
  title: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeL,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
  },
})
