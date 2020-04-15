import { getAriaProps } from './props'

test('returns aria props', () => {
  const props = { width: '400px', 'aria-label': 'clock', role: 'widget' }
  const ariaProps = getAriaProps(props)
  expect(ariaProps).toEqual({ 'aria-label': 'clock', role: 'widget' })
})
