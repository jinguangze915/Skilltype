import React from 'react'
import { number, string } from 'prop-types'
import { Layer, Feature } from 'react-mapbox-gl'
import ReactDOMServer from 'react-dom/server'
import MarkerSvg from './MarkerSvg'

function encodeSvg(reactElement) {
  return `data:image/svg+xml,${escape(
    ReactDOMServer.renderToStaticMarkup(reactElement)
  )}`
}

class MapMarker extends React.Component {
  static propTypes = {
    //
    // this must be an iconId constant from MarkerSvg like SCHOOL
    icon: number,
    //
    // this must be a key from the dictionary in colors.js
    color: string,
  }
  state = {
    loaded: false,
  }
  componentWillMount() {
    const { color, icon } = this.props
    this.image = new Image(80, 120)
    this.image.src = encodeSvg(
      <MarkerSvg color={color || 'black'} icon={icon} />
    )
    this.image.onload = () => {
      this.images = ['marker', this.image]
      this.setState({ loaded: true })
    }
  }
  render() {
    const { lnglat, icon, classes, ...others } = this.props
    return this.state.loaded ? (
      <Layer
        type="symbol"
        id="org-marker"
        layout={{ 'icon-image': 'marker', 'icon-size': 0.5 }}
        images={this.images}
        {...others}
      >
        <Feature coordinates={lnglat} />
      </Layer>
    ) : null
  }
}

export default MapMarker
