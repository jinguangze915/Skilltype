import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  resourceListHead: {
    marginBottom: '15px',
    fontFamily: theme.primaryFont,
    display: 'flex',
    flexDirection: 'row',

    '& $content': {
      marginRight: '2em',
    },

    '& $heading': {
      textTransform: 'uppercase',
      color: theme.darkGrey,
      marginBottom: '0.7em',
    },

    '& $summary': {
      color: theme.black,
    },
  },
  heading: {},
  summary: {},
  resourceList: {
    backgroundColor: theme.white,
    borderRadius: theme.borderRadius,

    '& $resourceListItem': {
      borderBottom: `1px solid ${theme.hairlineGrey}`,

      '&:last-child': {
        borderBottom: 'none',
      },
    },
  },
  resourceItem: {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    alignItems: 'flex-start',
    padding: theme.padding,

    '& $resourceItemMenu': {
      position: 'relative',

      ...macros.mobile(
        {
          paddingTop: '0.3em',
          justifyContent: 'flex-start',
          left: '-10px',
        },
        theme
      ),
      ...macros.tablet(
        {
          bottom: '9px',
        },
        theme
      ),
    },

    ...macros.mobile({
      paddingBottom: '0.2em',
    }),
  },
  resourceItemFallback: {
    '& $icon': {
      ...macros.fallbackContentPlaceholder(theme),
      '& svg': {
        opacity: 0,
      },
    },
    '& $title, & $meta, & $title:active': {
      color: 'rgba(0,0,0,0)',
      height: '1em',
      width: '75%',
      cursor: 'default',
      ...macros.fallbackContentPlaceholder(theme),
    },
    '& $meta': {
      width: '55%',
    },
  },
  resourceListItem: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.primaryFont,
  },
  resourceInfo: {
    color: theme.darkerGrey,
    margin: theme.padding,
    marginTop: 0,
    maxWidth: theme.maxContentWidth,
    //
    // ...macros.tablet(
    //   {
    //     paddingLeft: ICON_COL_WIDTH,
    //   },
    //   theme
    // ),

    ...macros.mobile(
      {
        marginTop: '0.4em',
        paddingTop: theme.padding,
        borderTop: `1px solid ${theme.lightGrey}`,
      },
      theme
    ),
  },
  icon: {
    paddingTop: '3px',
    marginRight: '12px',
  },

  title: {
    display: 'inline-block',
    color: theme.black,
    textDecoration: 'none',
    marginBottom: '0.6em',

    '&:hover': {
      color: theme.purple,
      textDecoration: 'underline',
    },
    '&:active': {
      backgroundColor: theme.lightPurple,
    },
  },
  meta: {
    color: theme.darkGrey,
    fontSize: theme.fontSizeM,
  },
  content: {
    flexGrow: 1,
  },
  resourceItemMenu: {
    justifyContent: 'flex-end',
    width: '100px',

    '& svg': {
      height: '20px',
      width: '20px',
    },

    '& button': {
      cursor: 'pointer',
    },
  },
  bookmarkButton: {
    padding: '10px',
    '& path': {
      fill: theme.white,
      stroke: theme.secondaryGrey,
      strokeWidth: '2px',
    },
    '&$active path': {
      fill: theme.purple,
      stroke: theme.purple,
    },
  },
  infoButton: {
    padding: '10px',
    '& path': {
      fill: theme.secondaryGrey,
    },
    '&$active path': {
      fill: theme.purple,
    },
  },
  active: {},
})
