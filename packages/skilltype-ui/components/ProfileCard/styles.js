import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  pinnedProfileCard: {
    display: 'flex',
    width: theme.profileCardWidth,
    position: 'relative',
    ...macros.tablet(
      {
        '& $card': {
          position: 'fixed',
          zIndex: theme.zIndex.profileCard,
        },
      },
      theme
    ),
  },
  avatar: {
    borderBottom: `1px solid ${theme.hairlineGrey}`,
    borderRadius: '3px 3px 0 0',
    height: '129px',
  },
  verified: {
    ...macros.centerBoth(),
    width: '17px',
    height: '17px',
    backgroundColor: theme.green,
    borderRadius: '17px',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
    marginLeft: '8px',

    '& svg': {
      position: 'relative',
      top: '1px',
    },
  },
  fixed: {},
  card: {
    width: theme.profileCardWidth,
  },
})
