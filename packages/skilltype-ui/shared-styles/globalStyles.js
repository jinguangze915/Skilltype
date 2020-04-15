import { macros, theme as defaultTheme } from './'

export default (theme = defaultTheme) => ({
  root: {
    ...macros.globals(theme),
  },
})
