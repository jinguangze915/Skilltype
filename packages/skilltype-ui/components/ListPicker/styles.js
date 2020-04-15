import { theme as defaultTheme, macros } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  listPicker: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 60px)',
    minHeight: 'calc(70% - 30px)',
    flex: '1 1 auto',
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexShrink: 0,

    ...macros.mobileOrMobileOs(
      {
        padding: '0.5em',
        backgroundColor: theme.lightGrey,
      },
      theme
    ),
  },
  queryInput: {
    border: 'none',
    borderRadius: 0,
    borderBottom: `1px solid ${theme.mediumGrey}`,
    '-webkit-appearance': 'none',
    lineHeight: 'normal',
    padding: '1.3em 35px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    backgroundColor: theme.white,

    ...macros.mobileOrMobileOs(
      {
        padding: '0.5em 28px',
        fontSize: theme.fontSizeMobileInput,
        borderRadius: '3px',
        borderBottom: 'none',
      },
      theme
    ),
  },
  listbox: {
    overflowY: 'scroll',
    backgroundColor: theme.white,
    paddingBottom: '5vh',
  },
  option: {
    padding: '1em',
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '&$selected svg': {
      marginLeft: '0.5em',
      '& path': {
        stroke: theme.darkGrey,
      },
    },

    '&$active': {
      backgroundColor: theme.lightGrey,
    },

    '&$isMember': {
      color: theme.green,
    },
  },
  ariaStatus: {
    opacity: 0,
    position: 'absolute',
    pointerEvents: 'none',
  },
  active: {},
  selected: {},
  isMember: {},
  clearInputButton: {
    position: 'absolute',
    right: '10px',
    backgroundColor: theme.mediumGrey,
    borderRadius: '15px',
    border: `3px solid ${theme.white}`,

    '& path': {
      stroke: theme.white,
    },

    ...macros.mobileOrMobileOs(
      {
        height: '30px',
      },
      theme
    ),
  },
  searchSvg: {
    width: '16px',
    height: '16px',
    position: 'absolute',
    left: '18px',

    '& path, & circle': {
      stroke: theme.darkGrey,
    },

    ...macros.tabletNotMobileOs(
      {
        left: '13px',
      },
      theme
    ),
  },
  noResults: {
    padding: '1em',
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.primaryFont,
    color: theme.darkGrey,
    lineHeight: '1.5em',
    ...macros.textLink({ display: 'block' }, theme),
  },
})
