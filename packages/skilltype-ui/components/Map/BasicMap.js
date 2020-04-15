/* eslint-disable react/style-prop-object */
import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'

const MapboxMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
})

const BasicMap = ({ lnglat, onLoad, children, ...others }) => (
  <MapboxMap
    style="mapbox://styles/skilltype/cjw1y1yez0ans1cplmx7qm4kd"
    containerStyle={{ flexGrow: 1, height: '100%', minHeight: '20px' }}
    center={lnglat}
    onStyleLoad={onLoad}
    {...others}
  >
    {children}
  </MapboxMap>
)

export default BasicMap
