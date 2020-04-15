import React from 'react'
import initStoryshots from '@storybook/addon-storyshots'
import { addDecorator } from '@storybook/react'
import { JssProvider } from 'react-jss'
// import reactMapboxGlMock from './mocks/react-mapbox-gl.mock'

// generate class names without JSS counter
const generateClassName = (rule, styleSheet) =>
  `${styleSheet.options.classNamePrefix}${rule.key}`

addDecorator(story => (
  <JssProvider generateClassName={generateClassName}>{story()}</JssProvider>
))

jest.mock('react-text-mask', () => 'MaskedInput')

// mock bugsnag-js
jest.mock('bugsnag-js', () => () => ({
  use(plugin) {
    const boundary = plugin.init()
    delete boundary.prototype.componentDidCatch
    return boundary
  },
}))

jest.mock('../packages/skilltype-ui/components/Map/BasicMap')
jest.mock('../packages/skilltype-ui/components/Map/MapMarker')

initStoryshots({ storyKindRegex: /^Modules/ })
