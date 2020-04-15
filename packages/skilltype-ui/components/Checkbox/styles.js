import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  label: {
    fontSize: `${theme.fontSizeL}`,
  },
  root: {
    '&$checked': {
      color: theme.yellow,
    },
  },
  icon: {
    '&$focused': {
      ...macros.focused(theme),
    },
    $disabled: {
      outline: 'none',
    },
  },
  checkedIcon: {
    '&$focused': {
      ...macros.focused(theme),
    },
    $disabled: {
      outline: 'none',
    },
  },
  checked: {},
  disabled: {},
  colorPrimary: {
    color: theme.disabledGrey,
  },
  focused: {},
})
