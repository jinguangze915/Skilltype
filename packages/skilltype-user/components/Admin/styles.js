import { theme as defaultTheme, macros } from '@skilltype/ui/shared-styles'

export default (theme = defaultTheme) => ({
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    padding: '20px',
    borderBottom: `1px solid ${theme.hairlineGrey}`,
    fontSize: '14px',
  },
  title: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeL,
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
  uploadItemsSection: {
    display: 'flex',
    padding: '20px 10px',
    alignItems: 'center',
  },
  uploadedAction: {
    marginLeft: 'auto',
    padding: '0 10px',
  },
  btnPrimary: {
    fontSize: '14px',
    color: theme.textColorDark,
    cursor: 'pointer',
    padding: '0 5px',
    background: 'none',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
  },
  btnDanger: {
    fontSize: '14px',
    color: '#d32f2f',
    cursor: 'pointer',
    padding: '0 5px',
    background: 'none',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
  },
  reportedTable: {
    '& tbody tr:hover $showOnHover': {
      opacity: '1',
    },
  },
  sectionFooter: {
    borderTop: '1px solid #e7e7e7',
    padding: '20px',

    '& p': {
      margin: 0,
    },
    '& p + p': {
      marginTop: '20px',
    },
  },
  showOnHover: {
    display: 'flex',
    opacity: '0',
    textAlign: 'right',
  },
})
