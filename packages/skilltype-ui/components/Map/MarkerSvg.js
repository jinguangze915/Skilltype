import React from 'react'
import colors from '../../shared-styles/colors'

export const SCHOOL = 1

const iconSvg = iconId => {
  switch (iconId) {
    case SCHOOL:
      return (
        <path
          d="M48,44 L48,52.1841432 L60,60 L72,52.1841432 L72,44 L60,51.8158568 L48,44 Z M60,28 L40,38.2857143 L60,48.5714286 L76.3636364,40.1542857 L76.3636364,52 L80,52 L80,38.2857143 L60,28 Z"
          fill="#FFFFFF"
          fillRule="nonzero"
        />
      )
    default:
      return null
  }
}

const MarkerSvg = ({ color, icon }) => (
  <svg
    width="64px"
    height="92px"
    viewBox="0 0 64 92"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-28.000000, -16.000000)">
        <path
          d="M60,16 C42.3085714,16 28,30.398 28,48.2 C28,60.8232822 42.4248251,67.6929418 50.7708333,79.8666548 C58.3918372,90.9828569 60,108 60,108 C60,108 61.4009965,92.0640634 69.5177083,79.8666548 C77.3974863,68.0252992 92,60.0961497 92,48.2 C92,30.398 77.6914286,16 60,16 Z"
          fill={colors[color]}
          fillRule="nonzero"
        />
        <polygon id="Path" points="8 16 104 16 104 112 8 112" />
        {iconSvg(icon)}
        <polygon points="0 0 120 0 120 120 0 120" />
      </g>
    </g>
  </svg>
)

export default MarkerSvg
