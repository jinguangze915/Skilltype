import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  hero: {
    '& img': {
      width: '95vw',
      ...macros.tablet(
        {
          width: '80vw',
        },
        theme
      ),
      ...macros.desktop(
        {
          width: '77vw',
          maxWidth: '750px',
        },
        theme
      ),
    },
  },
  guestHomeHero: {
    marginBottom: '30px',
  },
})
