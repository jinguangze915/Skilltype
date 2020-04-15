import { macros, theme as defaultTheme } from '../../shared-styles'

const radius = 15

export default (theme = defaultTheme) => ({
  radio: {
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.primaryFont,
    position: 'relative',
    paddingLeft: `${radius + 10}px`,
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1.3em',

    '& $glyph': {
      backgroundColor: theme.white,
      border: `1px solid ${theme.mediumGrey}`,
      width: `${radius}px`,
      height: `${radius}px`,
      borderRadius: `${radius}px`,
      position: 'absolute',
      left: 0,
      top: 0,
    },

    '& input': {
      opacity: 0,
      position: 'absolute',
      left: 0,
      top: 0,

      '&:checked+$glyph': {
        '&:before': {
          content: '""',
          backgroundColor: theme.purple,
          width: `${radius - 4}px`,
          height: `${radius - 4}px`,
          borderRadius: `${radius - 4}px`,
          position: 'absolute',
          left: 2,
          top: 2,
        },
      },
      '&:focus+$glyph': {
        ...macros.focused(),
      },
    },
  },
  glyph: {},
  radioGroup: {
    display: 'flex',

    '&$vertical': {
      flexDirection: 'column',

      '& $radio': {
        marginBottom: '0.5em',
      },
    },

    '&$horizontal': {
      alignItems: 'center',
      '& $radio': {
        marginRight: '1.5em',
      },
    },
  },
  vertical: {},
  horizontal: {},
})
