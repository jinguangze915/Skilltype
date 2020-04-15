import { theme as defaultTheme } from '../../shared-styles'

/*
 * Source: https://stackoverflow.com/a/36159798
 */
export default (theme = defaultTheme) => ({
  divider: {
    display: 'flex',
    flexBasis: '100%',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    margin: '8px 0px',

    '&:before': {
      content: '""',
      flexGrow: '1',
      flexBasis: '32px',
      background: theme.hairlineGrey,
      height: '1px',
      fontSize: '0px',
      lineHeight: '0px',
      marginRight: '16px',
    },

    '&:after': {
      content: '""',
      flexGrow: '1',
      flexBasis: '32px',
      background: theme.hairlineGrey,
      height: '1px',
      fontSize: '0px',
      lineHeight: '0px',
      marginLeft: '16px',
    },
  },
})
