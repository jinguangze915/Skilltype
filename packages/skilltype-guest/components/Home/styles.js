import { macros, theme as defaultTheme } from '@skilltype/ui'

export default (theme = defaultTheme) => ({
  pageHeading: {
    textAlign: 'center',
    marginTop: '10px',
  },
  primaryCta: {
    width: '85%',

    ...macros.tablet(
      {
        width: '460px',
      },
      theme
    ),
  },
})
