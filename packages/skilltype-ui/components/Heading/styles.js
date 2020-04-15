import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  pageHeading: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeXL,
    maxWidth: '300px',

    ...macros.tablet(
      {
        fontSize: theme.fontSizeXXL,
        maxWidth: '525px',
      },
      theme
    ),

    ...macros.desktop(
      {
        fontSize: theme.fontSizeXXXL,
        maxWidth: '590px',
      },
      theme
    ),
  },
  sectionHeading: {
    fontSize: theme.fontSizeL,
    marginBottom: '1em',

    '&:not(:first-child)': {
      marginTop: '1.8em',
    },
  },
})
