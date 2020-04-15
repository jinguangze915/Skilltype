import {
  profileThemes,
  macros,
  theme as defaultTheme,
} from '../../shared-styles'

export default (theme = defaultTheme) => ({
  colorInput: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1.5em',
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
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 50,
    flexWrap: 'wrap',
    paddingTop: '0.4em',
    borderRadius: theme.borderRadius,
  },
  color: {
    height: 36,
    width: 36,
    marginRight: 12,
    marginBottom: 12,
    border: `1px solid ${theme.mediumGrey}`,
    borderRadius: 4,
    '&$selected': {
      border: `2px solid #7ff0ff`,
    },
    '&:last-child': {
      marginRight: 0,
    },
    '&$disabled:focus': {
      outline: 'none !important',
    },
  },
  inline: {},
  selected: {},
  focus: {},
  error: {},
  disabled: {},
  helperText: {
    marginTop: '0.3em',
    fontSize: theme.fontSizeS,
    color: theme.darkGrey,
    ...macros.mobile({
      marginLeft: '0',
    }),

    '&$error': {
      color: theme.controlErrorColor,
    },

    '&$inline': {
      marginLeft: theme.labelWidth,
    },
  },
  ...profileThemes(theme).all,
})
