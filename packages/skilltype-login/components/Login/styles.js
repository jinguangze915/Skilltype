import { macros, theme as defaultTheme } from '@skilltype/ui'

export default (theme = defaultTheme) => ({
  login: {},
  logo: {
    ...macros.tabletNotMobileOs(
      {
        marginLeft: '15px',
      },
      theme
    ),

    ...macros.mobile(
      {
        position: 'relative',
        left: '10px',
      },
      theme
    ),

    '& img': {
      width: '40px',
    },
  },
})
