import { theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  menuBar: {
    '&$pinned $container': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: theme.zIndex.fixedHeader,
    },

    '&:focus': {
      outline: 'none',
    },
  },

  links: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },

  homeButton: {
    flexGrow: 0,

    '& img': {
      height: '32px',
    },
  },

  separator: {
    height: '24px',
    borderLeft: `1px solid ${theme.hairlineGrey}`,
    margin: '0 12px',
  },

  title: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeL,
    flexGrow: 0,
  },

  appMenuBar: {
    marginBottom: '30px',

    '& $container, &$container': {
      borderBottom: `1px solid ${theme.mediumGrey}`,
      backgroundColor: theme.white,
      padding: '10px 10px 10px 20px',
    },
  },

  guestMenuBar: {
    marginBottom: '30px',

    width: '100%',
    borderBottom: `1px solid ${theme.hairlineGrey}`,
    cursor: 'default',

    '&$pinned $container': {
      margin: '0 20px',
      paddingTop: '15px',
    },

    '& $container, &$container': {
      borderBottom: `1px solid ${theme.mediumGrey}`,
      backgroundColor: theme.bgColorLight,
      padding: '0 0 15px 5px',
    },

    '& $logo svg': {
      width: '136px',
      height: '36px',
    },
  },

  verticalMenuBar: {
    '& $container': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },

  container: {
    display: 'flex',
    alignItems: 'center',
  },

  logo: {},
  pinned: {},
})
