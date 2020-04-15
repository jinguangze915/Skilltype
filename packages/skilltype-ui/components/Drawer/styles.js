import { theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  sideDrawer: {
    width: '85vw',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    '& path': {
      stroke: theme.purple,
    },
  },
  sideDrawerHeader: {
    padding: '40px 10px 20px',
    backgroundColor: theme.lighterGrey,
    borderBottom: `1px solid ${theme.hairlineGrey}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    boxSizing: 'border-box',
    flexGrow: 0,
  },
  sideDrawerContent: {
    flexGrow: 1,
    overflowY: 'auto',
  },
  sideDrawerFooter: {
    borderTop: `1px solid ${theme.hairlineGrey}`,
    color: theme.secondaryGrey,
    fontFamily: theme.primaryFont,
    fontSize: theme.fontSizeNormal,
    padding: '1em 15px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
