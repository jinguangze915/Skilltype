import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  viewport: {
    padding: '15px',
    backgroundColor: theme.lightGrey,
    position: 'relative',
  },

  column: {
    display: 'flex',
    flexGrow: '0',
    flexShrink: '0',
    flexDirection: 'column',
    margin: '0 15px',
    boxSizing: 'border-box',

    '&:first-child': {
      marginLeft: 0,
      '&$withDivider': {
        ...macros.tablet({
          borderRight: `1px solid ${theme.hairlineGrey}`,

          '&:not($tight)': {
            paddingRight: '20px',
            marginRight: '5px',
          },
        }),
        ...macros.mobile({
          borderBottom: `1px solid ${theme.hairlineGrey}`,
        }),
      },
    },

    '&:last-child': {
      marginRight: '0',
      '&$withDivider': {
        ...macros.tablet({
          borderLeft: `1px solid ${theme.hairlineGrey}`,
          '&:not($tight)': {
            paddingLeft: '20px',
            marginLeft: '5px',
          },
        }),
        ...macros.mobile({
          borderTop: `1px solid ${theme.hairlineGrey}`,
        }),
      },
    },

    '&$tight': {
      margin: 0,
    },

    '&$grow': {
      flexGrow: 1,
      flexShrink: 1,
    },

    '&$fixed': {
      width: theme.profileCardWidth,

      '&>div': {
        position: 'fixed',
        zIndex: theme.zIndex.profileCard,
        overflowY: 'auto',
        paddingRight: '12px',
        paddingBottom: '2em',
        display: 'flex',
        flexDirection: 'column',

        '&>*': {
          flexShrink: 0,
        },
      },
    },
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: '30px',
    boxSizing: 'border-box',

    '&:last-child': {
      marginBottom: '15px',
    },

    '&$tight': {
      margin: 0,
    },
  },

  content: {
    maxWidth: theme.maxContentWidth,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  page: {
    composes: '$content',
    maxWidth: theme.maxPageWidth,
  },

  ...macros.mobile(
    {
      row: {
        flexWrap: 'wrap',
      },
      column: {
        margin: 0,
        width: '100%',
        marginBottom: '30px',

        '&:last-child': {
          marginBottom: 0,
        },
      },
    },
    theme
  ),

  fullscreen: {
    minHeight: '100vh',
    boxSizing: 'border-box',
  },

  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  centerSelf: {
    margin: '0 auto',
  },

  ariaOnly: {
    opacity: 0,
    position: 'absolute',
    pointerEvents: 'none',
  },

  grow: {},
  fixed: {},
  tight: {},
  withDivider: {},
})
