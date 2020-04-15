import defaultTheme from './theme'
import { isMobileOs } from '../lib/mediaQuery'

const nestedQuery = (query, styles, theme) => {
  const hoisted = {}
  const wrapped = {
    [query]: Object.keys(styles).reduce((styleObj, styleKey) => {
      if (styleKey.charAt(0) === '&') {
        hoisted[styleKey] = nestedQuery(query, styles[styleKey], theme)
        return styleObj
      }
      styleObj[styleKey] = styles[styleKey]
      return styleObj
    }, {}),
  }
  return {
    ...wrapped,
    ...hoisted,
  }
}

export const asNumber = numberLike => parseInt(numberLike, 10)

export const mobileOs = styles => (isMobileOs() ? styles : {})

export const notMobileOs = styles => (!isMobileOs() ? styles : {})

export const mobileQuery = (theme = defaultTheme) =>
  `(max-width: ${theme.mobileWidth})`
export const mobile = (styles, theme = defaultTheme) =>
  nestedQuery(`@media ${mobileQuery(theme)}`, styles, theme)

export const mobileOrMobileOs = (styles, theme = defaultTheme) => ({
  ...mobile(styles, theme),
  ...mobileOs(styles),
})

export const tabletQuery = (theme = defaultTheme) =>
  `(min-width: ${asNumber(theme.mobileWidth) + 1}px)`
export const tablet = (styles, theme = defaultTheme) =>
  nestedQuery(`@media ${tabletQuery(theme)}`, styles, theme)

export const tabletOnlyQuery = (theme = defaultTheme) =>
  `(min-width: ${asNumber(theme.mobileWidth) + 1}px) and (max-width: ${
    theme.desktopWidth
  })`
export const tabletOnly = (styles, theme = defaultTheme) =>
  nestedQuery(`@media ${tabletOnlyQuery(theme)}`, styles, theme)

export const tabletNotMobileOs = (styles, theme = defaultTheme) =>
  notMobileOs(tablet(styles, theme))

export const desktopQuery = (theme = defaultTheme) =>
  `(min-width: ${asNumber(theme.desktopWidth) + 1}px)`
export const desktop = (styles, theme = defaultTheme) =>
  nestedQuery(`@media ${desktopQuery(theme)}`, styles, theme)

export const centerBoth = styles => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  ...styles,
})

export const focused = (theme = defaultTheme) => ({
  outline: `${theme.focusOutlineColor} auto ${theme.focusOutlineWidth}`,
})

export const focusedLight = (theme = defaultTheme) => ({
  outline: `${theme.focusLightOutlineColor} auto ${theme.focusOutlineWidth}`,
})

export const boxShadow = theme => ({
  boxShadow: `0 2px ${theme.borderRadius} 0 rgba(140, 140, 140, 0.5)`,
})
export const globals = (theme = defaultTheme) => ({
  '& *:focus': {
    ...focused(theme),
  },
  '& .dark *:focus': {
    ...focusedLight(theme),
  },
})

export const highlightMask = styles => ({
  content: '""',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  ...styles,
})

export const textLink = (styles, theme = defaultTheme) => ({
  '& a, & a:visited, & a:hover, & a:active': {
    color: theme.purple,
    ...styles,
  },
})

export const fallbackContentPlaceholder = (theme = defaultTheme) => ({
  backgroundColor: theme.mediumGrey,
  borderRadius: theme.borderRadius,
  display: 'block',
})
