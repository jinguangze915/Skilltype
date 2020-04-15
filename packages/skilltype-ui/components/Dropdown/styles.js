import { theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  container: {
    position: 'relative',
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    background: 'white',
    padding: '6px',
    cursor: 'pointer',

    '&:active': {
      background: theme.bgColorLight,
    },
  },
  label: {
    fontSize: '14px',
    padding: '0 6px',
  },
  icon: {
    padding: '0 6px',
  },
  menu: {
    position: 'absolute',
    display: 'none',
    margin: '0',
    padding: '0',
    zIndex: '99',
    border: '1px solid #f7f7f7',
    boxShadow: '0 2px 3px 0 rgba(140, 140, 140, 0.5)',
    backgroundColor: '#fff',
    listStyle: 'none',
  },
  opened: {
    '& + ul': {
      display: 'block',
    },
  },
  item: {
    border: 'none',
    padding: '12px',
    fontSize: '14px',
    background: 'transparent',
    cursor: 'pointer',
    width: '100%',
    minWidth: '150px',
    textAlign: 'left',

    '&:hover': {
      background: theme.bgColorLight,
    },
  },
  separator: {
    height: '1px',
    width: '100%',
    background: theme.bgColorLight,
  },
})
