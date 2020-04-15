import { theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  notify: {
    margin: '10px 0 20px 0',
    borderRadius: theme.borderRadius,
    flexGrow: 0,

    '& a': {
      color: theme.lightPurple,
    },

    '&$error': {
      backgroundColor: theme.darkRed,
    },
  },
  closeButton: {
    '&:hover svg path, &:active svg path': {
      stroke: theme.black,
    },
    '& svg path': {
      stroke: theme.white,
    },
  },
  message: {},
  error: {},
})
