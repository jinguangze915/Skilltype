import { theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  search: {
    flexGrow: 1,
    cursor: 'text',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.white,
    zIndex: theme.zIndex.modal,
  },
  overlay: {
    zIndex: theme.zIndex.modal,
  },
})
