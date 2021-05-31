import React from 'react'

const SVG = ({
  style = {},
  fill = 'none',
  width = '100%',
  className = 'fill-current h-6 w-6',
  viewBox = '0 0 24 24',
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M0 0h24v24H0z" fill={fill} />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)

export default SVG
