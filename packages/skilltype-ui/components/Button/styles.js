import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => {
  const textButton = {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    padding: '10px 20px',
  }

  return {
    '@keyframes decay': {
      '0%': {
        opacity: '0.4',
      },
      '100%': {
        opacity: 0,
      },
    },
    button: {
      borderRadius: '3px',
      outline: 'none',
      userSelect: 'none',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      lineHeight: '1em',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',

      '&$highlight': {
        backgroundColor: theme.focusLightOutlineColor,
      },

      ...macros.notMobileOs({
        '&:hover:not([disabled]):not(:active)': {
          filter: 'brightness(1.25)',
        },
        '&:active:not([disabled])': {
          filter: 'brightness(0.75)',
        },
        '&.transparentButton': {
          '&:hover:not([disabled]):not(:active)': {
            filter: 'none',
          },
          '&:active:not([disabled])': {
            backgroundColor: theme.lighterGrey,
          },
        },
      }),

      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.black,
        opacity: 0,
        borderRadius: '3px',
      },

      '&.touchDecay:not([disabled]):after': {
        animation: `decay ${theme.transitionSlow} ease-out`,
      },
    },

    primaryButton: {
      ...textButton,
      border: `1px solid ${theme.bgColorDark}`,
      backgroundColor: theme.bgColorDark,
      color: theme.textColorLight,

      '&.disabled': {
        border: `1px solid ${theme.disabledGrey}`,
        backgroundColor: theme.disabledGrey,
      },
    },

    secondaryButton: {
      ...textButton,
      border: `1px solid ${theme.bgColorDark}`,
      color: theme.textColorDark,
      backgroundColor: theme.white,

      '&.disabled': {
        color: theme.disabledGrey,
        border: `1px solid ${theme.disabledGrey}`,
      },
    },

    transparentButton: {
      ...macros.notMobileOs({
        '&:hover:not([disabled]):not(:active)': {
          filter: 'none',
          backgroundColor: theme.lighterGrey,
        },
        '&:active:not([disabled])': {
          backgroundColor: theme.lightGrey,
        },
      }),
    },

    tertiaryButton: {
      ...textButton,
      color: theme.textColorDarkSecondary,
    },

    editButton: {
      color: theme.purple,
      padding: '3px',

      '& svg': {
        marginRight: '6px',
      },

      '& path': {
        fill: theme.purple,
      },
    },

    closeButton: {
      '& svg': {
        width: '25px',
        height: '25px',
      },

      '& path': {
        stroke: theme.black,
        strokeWidth: '3px',
      },

      '&.disabled': {
        opacity: 0.3,
      },
    },

    backButton: {
      padding: '3px 6px 3px 6px',

      '& svg': {
        width: '19px',
        height: '19px',
      },

      '& path': {
        stroke: theme.black,
        strokeWidth: '2px',
      },
    },

    secondaryTextButton: {
      ...textButton,
      color: theme.darkGrey,
    },

    primaryTextButton: {
      ...textButton,
      color: theme.purple,

      '&.disabled': {
        color: theme.darkGrey,
      },
    },

    highlight: {},

    inlineLinkButton: {
      ...textButton,
      display: 'inline',
      padding: 0,
      textDecoration: 'underline',
      color: theme.darkGrey,
    },

    fileInputButton: {
      borderRadius: '3px',
      outline: 'none',
      userSelect: 'none',
      cursor: 'pointer',
      background: 'none',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      lineHeight: '1em',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      '&$highlight': {
        backgroundColor: theme.focusLightOutlineColor,
      },
      ...macros.notMobileOs({
        '&:hover:not([disabled]):not(:active)': {
          filter: 'brightness(1.25)',
        },
        '&:active:not([disabled])': {
          filter: 'brightness(0.75)',
        },
        '&.transparentButton': {
          '&:hover:not([disabled]):not(:active)': {
            filter: 'none',
          },
          '&:active:not([disabled])': {
            backgroundColor: theme.lighterGrey,
          },
        },
      }),
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.black,
        opacity: 0,
        borderRadius: '3px',
      },
      ...textButton,
      height: '10px',
      marginTop: '4px',
      backgroundColor: theme.lighterGrey,
      border: `1px solid ${theme.lighterGrey}`,
      color: theme.textColorDarkSecondary,
    },
  }
}
