// returns aria props from a props object
// e.g. getAriaProps({ width: '400px', 'aria-label': 'clock', 'role': 'widget' })
//   returns: { 'aria-label': 'clock', 'role': 'widget' }
export function getAriaProps(props) {
  return Object.keys(props).reduce(
    (ariaProps, prop) => ({
      ...ariaProps,
      ...(prop.match(/^aria|role|disabled/) ? { [prop]: props[prop] } : {}),
    }),
    {}
  )
}
