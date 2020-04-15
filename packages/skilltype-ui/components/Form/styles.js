import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    '& label:first-child': {
      marginTop: '0',
    },

    '& label': {
      marginTop: '1.5em',
    },

    '& button + button, & button + a': {
      marginTop: '0.5em',
    },

    paddingBottom: '2em',
  },
  formInput: {
    display: 'flex',
    flexDirection: 'column',

    '& + $formInput': {
      marginTop: '1.5em',
    },
  },
  inputWrapper: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',

    '&$inline': {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
      ...macros.mobile({
        flexDirection: 'column',
      }),
    },
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',

    '& + $formField': {
      marginTop: '1.5em',
    },
  },
  fieldWrapper: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',

    '&$inline': {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
      ...macros.mobile({
        flexDirection: 'column',
      }),
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    marginBottom: '0.3em',
    fontSize: theme.fontSizeL,
    color: theme.darkerGrey,

    '&$inline': {
      width: theme.labelWidth,
      ...macros.mobile({
        width: 'auto',
        flexGrow: 1,
      }),
    },

    '&$multiline': {
      alignItems: 'baseline',
    },
  },
  helperText: {
    marginTop: '0.3em',
    fontSize: theme.fontSizeM,
    color: theme.darkGrey,

    '&$inline': {
      marginLeft: theme.labelWidth,
      ...macros.mobile({
        marginLeft: '0',
      }),
    },

    '&$error': {
      color: theme.controlErrorColor,
    },
  },
  focus: {},
  error: {},
  inline: {},
  multiline: {
    '& textarea:focus': {
      outline: 'none',
    },
  },
  disabled: {},
})
