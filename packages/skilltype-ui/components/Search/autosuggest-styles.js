import { macros, theme as defaultTheme } from '../../shared-styles'

export const inputHeight = '35px'
export const inputHeightMobile = '38px'

export default isModal => (theme = defaultTheme) => ({
  container: {
    position: 'relative',
    transition: 'all 300ms ease',
    height: inputHeight,

    ...macros.mobileOrMobileOs(
      {
        height: inputHeightMobile,
        position: 'relative',
        bottom: '3px',
        ...(isModal
          ? {
              position: 'fixed',
              top: '66px',
              left: 0,
              right: 0,
              bottom: 0,
              height: '100%',
              backgroundColor: theme.white,
              zIndex: theme.zIndex.modal,
            }
          : {}),
      },
      theme
    ),

    ...macros.tabletNotMobileOs(
      isModal
        ? {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.white,
            zIndex: theme.zIndex.modal,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }
        : {},
      theme
    ),
  },
  inputContainer: {
    ...macros.mobileOrMobileOs(
      isModal
        ? {
            margin: '0 8px 8px 3px',
            padding: '3px 6px',
            border: 'none',
            height: '50px',
            zIndex: theme.zIndex.modal,
            backgroundColor: theme.white,
          }
        : {},
      theme
    ),
    ...macros.tabletNotMobileOs(
      isModal
        ? {
            // borderRadius: '3px',
            // border: `1px solid ${theme.hairlineGrey}`,
            padding: '3px 5px',
            margin: '10px 5px',
          }
        : {},
      theme
    ),
  },
  input: {
    height: inputHeight,
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeS,
    border: 0,
    color: theme.black,
    padding: '0 0 0 5px',

    ...macros.mobileOrMobileOs(
      {
        height: inputHeightMobile,
        fontSize: theme.fontSizeL,
      },
      theme
    ),

    '&:-ms-clear': {
      display: 'none',
    },

    '&:placeholder': {
      transition: 'opacity 150ms ease-in',
      color: 'rgba(0, 0, 0, 0.5)',
    },
  },
  inputOpen: {},
  inputFocused: {
    outline: 'none',
  },
  inputShadow: {
    composes: '$input',
    position: 'absolute',
    visibility: 'hidden',
    height: 'auto',
    width: 'auto',
    whiteSpace: 'nowrap',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    top: inputHeight,
    left: '-6px',
    border: `1px solid ${theme.hairlineGrey}`,
    backgroundColor: theme.white,
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeS,
    borderRadius: '3px',
    // zIndex: 300,
    transition: 'height 100ms ease-in-out',

    ...macros.mobileOrMobileOs(
      {
        fontSize: theme.fontSizeNormal,
        top: inputHeightMobile,
        ...(isModal
          ? {
              top: '50px',
              bottom: 0,
              left: 0,
              right: 0,
              border: 'none',
              borderTop: `1px solid ${theme.hairlineGrey}`,
              overflowY: 'scroll',
              /* enable smooth scrolling, rubber-band effect, etc */
              '-webkit-overflow-scrolling': 'touch',
              /* accomodate for the space occupied by the mobile keyboard */
              paddingBottom: '350px',
            }
          : {}),
      },
      theme
    ),

    ...macros.tabletNotMobileOs(
      isModal
        ? {
            position: 'static',
            flexGrow: 1,
            border: 'none',
            overflowY: 'scroll',
            cursor: 'default',
          }
        : {},
      theme
    ),
  },
  suggestionsContainer: {
    ...macros.tabletNotMobileOs(
      isModal
        ? {
            flexGrow: 1,
            cursor: 'default',
          }
        : {},
      theme
    ),
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    padding: '7px 15px 5px 10px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',

    ...macros.mobileOrMobileOs(
      {
        padding: '13px 15px 10px 10px',
      },
      theme
    ),
  },
  suggestionHighlighted: {
    backgroundColor: theme.lighterGrey,
  },
  noResultsMessage: {
    composes: '$suggestion',
  },
})
