import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  section: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    lineHeight: '1.4em',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '& + $section:not($tight)': {
      marginTop: '1.4em',
    },
  },
  newGroup: {
    borderTop: `1px solid ${theme.hairlineGrey}`,
  },
  formSection: {
    backgroundColor: theme.white,
    borderRadius: theme.borderRadius,
    padding: '25px 15px 30px',
    border: `1px solid ${theme.mediumGrey}`,
    marginBottom: '0.8em',

    '& + $formSection': {
      marginTop: 0,
    },
  },
  instructionSection: {
    color: theme.darkGrey,
    lineHeight: '1.5em',
    paddingBottom: '0.4em',

    ...macros.mobile(
      {
        fontSize: theme.fontSizeS,
      },
      theme
    ),
  },
  titledSection: {
    backgroundColor: theme.white,
    borderRadius: theme.borderRadius,
    // padding: '25px 15px 30px',
    border: `1px solid ${theme.mediumGrey}`,
    marginBottom: '0.8em',
    ...macros.boxShadow(theme),
  },
  title: {
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderBottom: `1px solid ${theme.hairlineGrey}`,
    fontSize: theme.fontSizeL,
    color: theme.black,
  },
  formSectionTitle: {
    borderBottom: `1px solid ${theme.hairlineGrey}`,
    paddingBottom: '10px',
    marginBottom: '10px',
    fontSize: theme.fontSizeXL,
    color: theme.black,
  },
  contentPadding: {
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  rawSection: {
    display: 'block',

    '&>*': {
      display: 'inline',
    },
  },
  tight: {},
  bulletSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',

    '&$bigIcon': {
      '& $bulletIcon': {
        height: '35px',
        width: '35px',
      },
      '& $bulletContent': {
        paddingLeft: '1em',
      },
    },

    '& + $bulletSection:not($tight)': {
      marginTop: '1.2em',
    },
  },
  bulletIcon: {
    flexGrow: 0,
    flexShrink: 0,
    height: '17px',
    width: '17px',
  },
  bulletContent: {
    paddingLeft: '0.7em',
    flexGrow: 1,
  },
  bigIcon: {},
  calloutSection: {
    borderRadius: theme.borderRadius,
  },
})
