import React from 'react';

const SVG = ({
  style = {},
  fill = 'none',
  width = '100%',
  height = '100%',
  className = 'inline-block fill-current h-6 w-6',
  viewBox = '0 0 24 24',
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill={fill} />
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
  </svg>
);

export default SVG;
