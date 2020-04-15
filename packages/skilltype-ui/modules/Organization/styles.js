import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  // OrganizationList
  addCard: {
    height: 216,
  },

  // OrganizationForm
  title: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeL,
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: '20px',
    borderBottom: `1px solid ${theme.hairlineGrey}`,
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

  // Organization Fallback
  requestDeletion: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  requestDeletionTitle: {
    fontWeight: 'bold',
    color: theme.darkRed,
  },

  requestDeletionButton: {
    color: theme.darkRed,
    borderColor: theme.darkRed,
  },

  // Organization Fallback
  fallbackHeader: {
    fontWeight: 800,
    fontSize: theme.fontSizeL,
  },
  fallbackDescription: {
    marginTop: '1rem',
  },
  fallbackContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '40px',
    fontFamily: theme.primaryFont,
    backgroundColor: theme.white,
    borderRadius: theme.borderRadius,
    border: `2px solid ${theme.hairlineGrey}`,
    maxWidth: theme.wideModalWidth,
    ...macros.mobile(
      {
        justifyContent: 'center',
        flexDirection: 'column',
      },
      theme
    ),
  },
  fallbackLeft: {
    flexBasis: '45%',
    justifyContent: 'left',
    ...macros.mobile(
      {
        marginBottom: '2rem',
        flexGrow: 1,
        maxWidth: theme.cardWidth,
      },
      theme
    ),
    ...macros.tablet({}, theme),
  },
  fallbackRight: {},
  confirmMessage: {
    fontFamily: '"-apple-system", "Helvetica", sans-serif',
    fontSize: '14px',
  },
  resendBtn: {
    color: theme.textColorDark,
    cursor: 'pointer',
    padding: '0 5px',
    background: 'none',
    border: 'none',
    outline: 'none',
  },
  revokeBtn: {
    color: '#d32f2f',
    cursor: 'pointer',
    padding: '0 5px',
    background: 'none',
    border: 'none',
    outline: 'none',
  },
})
