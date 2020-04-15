import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  menu: {
    display: 'flex',
    '&$alwaysCollapse': {
      '& $menuButton': {
        display: 'unset',
      },
    },
  },
  menuButton: {
    display: 'none',

    ...macros.mobile({ display: 'unset' }, theme),

    '& svg': {
      width: '30px',
      height: '30px',
    },
  },
  userHeaderMenu: {
    '& $menuButton': {
      padding: '6px',
      '& svg': {
        width: '24px',
        height: '24px',
      },
    },
    '& $menuContainer': {
      width: '90vw',
    },
  },
  guestHeaderMenu: {
    '& menuContainer': {
      width: '90vw',
    },
  },
  itemList: {
    display: 'flex',
    ...macros.mobile(
      {
        flexDirection: 'column',
      },
      theme
    ),
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'left',
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    textDecoration: 'none',
    paddingLeft: '10px',
    paddingRight: '10px',
    outlineOffset: `-${theme.focusOutlineWidth}`,
    borderRadius: 0,

    '&$active, &$active:hover:not([disabled]):not(:active)': {
      backgroundColor: theme.lightYellow,
    },

    '&$active_grey, &$active_grey:hover:not([disabled]):not(:active)': {
      backgroundColor: theme.mediumGrey,
    },
  },
  guestHeaderMenuItem: {
    color: theme.purple,
    ...macros.mobile(
      {
        color: theme.black,
        padding: '15px 10px',
        borderTop: `1px solid ${theme.hairlineGrey}`,
        justifyContent: 'space-between',
        '& $chevron': {
          display: 'block',
        },
        '&:first-of-type': {
          borderTop: 'none',
        },
      },
      theme
    ),
    ...macros.tablet(
      {
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      theme
    ),
  },
  segmentedMenuItem: {
    borderBottom: `1px solid ${theme.hairlineGrey}`,
    justifyContent: 'flex-start',

    '&:last-child': {
      borderBottom: 'none',
    },

    color: theme.black,
    flexGrow: 1,
  },
  chevron: {
    color: theme.mediumGrey,
    display: 'none',
  },
  logo: {
    marginLeft: '15px',
  },
  alwaysCollapse: {},
  menuContainer: {
    minWidth: '150px',
    maxWidth: '380px',
    borderRadius: theme.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,

    '&:not($transparent)': {
      border: `1px solid ${theme.lighterGrey}`,
      backgroundColor: theme.white,
      ...macros.boxShadow(theme),
    },

    '& $menuSection:first-child': {
      marginTop: 0,

      '& $menuSectionTitle': {
        borderTop: 0,
      },
    },
  },
  horizontalMenuContainer: {
    flexDirection: 'row',

    '& $segmentedMenuItem': {
      borderBottom: 'none',
      borderRight: `1px solid ${theme.hairlineGrey}`,
      borderRadius: 0,
      justifyContent: 'center',

      '&:last-child': {
        borderRight: 'none',
      },
    },

    '& $menuSection': {
      flexDirection: 'row',
    },
  },
  headerMenuTitle: {
    padding: '15px 10px 3px 10px',
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeL,
  },
  menuSection: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',

    '& $menuItem': {
      color: theme.black,
    },
  },
  menuSectionTitle: {
    padding: '10px 10px',
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeS,
    backgroundColor: theme.lighterGrey,
    borderTop: `1px solid ${theme.hairlineGrey}`,
    borderBottom: `1px solid ${theme.hairlineGrey}`,
    textTransform: 'uppercase',

    ...macros.mobile(
      {
        padding: '15px 10px',
      },
      theme
    ),
  },
  version: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    fontSize: theme.fontSizeS,
    color: theme.mediumGrey,
    fontFamily: theme.primaryFont,
  },
  active: {},
  active_grey: {},
  menuItemIcon: {
    marginRight: '0.8em',
    width: '1.7em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ...macros.mobile(
      {
        marginRight: '0.6em',
      },
      theme
    ),
  },
  transparent: {},
})
