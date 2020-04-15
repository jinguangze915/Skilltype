import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => {
  const hoverHighlightMask = macros.highlightMask({
    backgroundColor: theme.black,
    opacity: 0.2,
  })
  const tag = {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    lineHeight: '1em',
    borderRadius: '3px',
    padding: '12px 10px',
    ...macros.boxShadow(theme),
    whiteSpace: 'nowrap',
    margin: '0 10px 10px 0',
    backgroundColor: theme.tagBackgroundColor,
    color: theme.black,
    overflow: 'hidden',

    '&$active': {
      backgroundColor: theme.tagBackgroundActiveColor,
      boxShadow: '0 2px 6px 0 rgba(100, 100, 100, 0.9)',
    },

    '&$clickable': {
      cursor: 'pointer',
    },
  }
  return {
    tag,
    addTag: {
      display: 'flex',
    },
    removableTag: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      padding: 0,

      '& $tagContent': {
        padding: tag.padding,
        paddingRight: '0.5em',
      },

      '&$active $removeButton:before': hoverHighlightMask,

      ...macros.tabletNotMobileOs(
        {
          '&:hover:not([disabled])': {
            backgroundColor: theme.tagBackgroundActiveColor,
          },
          '&$active:hover $removeButton:before': hoverHighlightMask,
        },
        theme
      ),
    },
    removeButton: {
      padding: '0 4px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '3px',
      position: 'relative',
      margin: '3px 3px 3px 0',
      overflow: 'hidden',

      '& svg': {
        width: '20px',
        height: '20px',
        position: 'relative',

        '& path': {
          stroke: theme.black,
          strokeWidth: '3px',
        },

        ...macros.mobileOrMobileOs(
          {
            width: '25px',
            height: '25px',
          },
          theme
        ),
      },

      '&:disabled svg path': {
        stroke: theme.darkGrey,
      },
      '&:hover:not([disabled]):not(:active):before': hoverHighlightMask,
      '&:active:not([disabled]):before': macros.highlightMask({
        backgroundColor: theme.black,
        opacity: 0.3,
      }),
    },
    tagContent: {},
    active: {},
    clickable: {},
  }
}
