import merge from 'lodash.merge'
import { macros, theme as defaultTheme } from '../../shared-styles'

const unique = keys =>
  Object.keys(keys.reduce((acc, key) => ({ ...acc, [key]: null }), {}))

const noStyles = () => ({})

// Each argument is a function that returns an object. All values in the object
// are functions that take the current style and state and return style
// definitions
export const mergeSelectStyles = (base, override) => props => {
  // base and override are map of { key: styleFn(styles, state) => styles }
  const baseStyleFns = base(props)
  const overrideStyleFns = override(props)

  const allKeys = Object.keys(baseStyleFns)
    .concat(Object.keys(overrideStyleFns))
    .filter(Boolean)
  const uniqueKeys = unique(allKeys)
  const mergedStyleFns = uniqueKeys.reduce(
    (dedupe, key) => ({
      ...dedupe,
      // Make a new style function for this style key that merges the base
      // and override styles
      [key]: (styles, state) => {
        const baseStyles =
          typeof baseStyleFns[key] === 'function'
            ? baseStyleFns[key](styles, state)
            : noStyles()
        const overrideStyles =
          typeof overrideStyleFns[key] === 'function'
            ? overrideStyleFns[key](styles, state)
            : noStyles()
        return merge(baseStyles, overrideStyles)
      },
    }),
    {}
  )
  return mergedStyleFns
}

export const reactSelectStyles = ({ error, theme = defaultTheme }) => ({
  container: styles => ({
    ...styles,
    display: 'flex',
    flexGrow: 1,
    fontFamily: theme.primaryFont,
  }),
  control: (styles, state) => {
    let backgroundColor = theme.controlHighlight
    if (error) backgroundColor = theme.controlErrorHighlight
    if (state.isFocused) backgroundColor = theme.controlHighlightFocus
    if (state.isFocused && error)
      backgroundColor = theme.controlErrorHighlightFocus
    return {
      ...styles,
      display: 'flex',
      flexGrow: 1,
      paddingTop: '2px',
      paddingBottom: '2px',
      borderRadius: theme.borderRadius,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'transparent',
      backgroundColor,
      fontSize: theme.fontSizeL,
      outline: state.isFocused ? macros.focused(theme).outline : 'none',
      '&:hover': {
        border: !state.isFocused && `2px solid ${theme.mediumGrey}`,
      },
    }
  },
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isFocused && theme.mediumGrey,
    color: theme.black,
    fontSize: theme.fontSizeL,
    '&:hover': {
      backgroundColor: theme.controlHighlight,
    },
  }),
  placeholder: styles => ({
    ...styles,
    fontSize: theme.fontSizeL,
  }),
  menu: styles => ({
    ...styles,
    fontFamily: theme.primaryFont,
    backgroundColor: theme.white,
  }),
})
