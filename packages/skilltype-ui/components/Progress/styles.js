import { macros, theme as defaultTheme } from '../../shared-styles'

export default (theme = defaultTheme) => ({
  inFullscreenModal: {},
  progress: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    zIndex: theme.zIndex.progress,

    ...macros.mobileOrMobileOs(
      {
        '&$inFullscreenModal': {
          top: '62px',
          height: '8px',
        },
      },
      theme
    ),
  },
  progressColor: {
    backgroundColor: theme.yellow,
  },
  progressBarColor: {
    backgroundColor: theme.lightGrey,
  },
})
