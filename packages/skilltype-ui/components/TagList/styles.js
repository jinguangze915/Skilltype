import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    outline: 'none',
    overflowY: 'scroll',
  },
  editTagList: {
    padding: '10px',
    backgroundColor: theme.white,
    border: `1px solid ${theme.lighterGrey}`,
    borderRadius: '3px',
    cursor: 'text',

    '&$inModal': {
      padding: 0,
      border: 0,

      ...macros.mobileOrMobileOs(
        {
          marginBottom: '100vh',
        },
        theme
      ),
    },
  },
  inModal: {},
  comboBox: {},
  inputActive: {},
  tagListPicker: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: theme.white,
    position: 'relative',

    '& $tagList': {
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      padding: '15px 10px',

      ...macros.mobileOrMobileOs(
        {
          maxHeight: '30%',
          flexShrink: 0,
        },
        theme
      ),

      ...macros.tabletNotMobileOs(
        {
          margin: '7px',
          padding: '3px',
          flexBasis: '50%',
        },
        theme
      ),
    },

    '& $comboBox': {
      borderTop: `1px solid ${theme.mediumGrey}`,

      ...macros.mobileOrMobileOs(
        {
          '&$inputActive': {
            borderTop: 'none',
          },
        },
        theme
      ),

      ...macros.tabletNotMobileOs(
        {
          borderTop: 'none',
          borderLeft: `1px solid ${theme.mediumGrey}`,
          flexBasis: '50%',
          maxHeight: 'initial',
          minHeight: 'initial',
        },
        theme
      ),
    },

    ...macros.mobileOrMobileOs(
      {
        flexDirection: 'column',
      },
      theme
    ),
  },
  tagEditor: {
    ...macros.mobileOrMobileOs(
      {
        '&$hide': { display: 'none' },
      },
      theme
    ),
  },
  hide: {},
  noTags: {
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    color: theme.darkGrey,
    padding: '0.5em',
    ...macros.textLink({}, theme),
  },
})
