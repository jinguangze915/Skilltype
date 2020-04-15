import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  input: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    overflow: 'hidden',
    border: '2px solid transparent',
    borderRadius: theme.borderRadius,
    backgroundColor: theme.controlHighlight,

    '&$multiline': {
      alignItems: 'baseline',
      padding: '10px 6px 8px 6px',
    },

    '&:not($multiline)': {
      minHeight: '38px',
      maxHeight: '38px',
    },

    // State styling
    '&:not($focus):hover': {
      border: `2px solid ${theme.mediumGrey}`,
    },
    '&$focus': {
      border: `2px solid ${theme.mediumGrey}`,
      backgroundColor: theme.controlHighlightFocus,
      ...macros.focused(theme),
    },
    '& input:focus': {
      backgroundColor: theme.controlHighlightFocus,
      outline: 0,
    },
    '& input': {
      borderRadius: theme.borderRadius,
      lineHeight: 'normal',
      padding: '8px 6px',
      display: 'flex',
      alignItems: 'center',
      '-webkit-appearance': 'none',
    },
    '&$error': {
      backgroundColor: theme.controlErrorHighlight,
    },
    '&$error$focus': {
      backgroundColor: theme.controlHighlightFocus,
    },
  },
  prefix: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 6px',
    lineHeight: 'normal',
    color: theme.darkGrey,

    '& + input': {
      paddingLeft: '3px',
    },
  },
  focus: {},
  error: {},
  multiline: {
    '& textarea:focus': {
      outline: 'none',
    },
  },
  phoneInput: {
    width: '11em',
  },
  zipInput: {
    width: '5em',
  },
})
