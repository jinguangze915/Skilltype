import { theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: '18px',

    '& > header': {
      fontFamily: theme.primaryFont,
      fontSize: theme.fontSizeL,
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
    },
  },
  editButton: {
    marginLeft: '6px',
  },
})
