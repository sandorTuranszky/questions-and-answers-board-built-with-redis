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
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

export default SVG;
