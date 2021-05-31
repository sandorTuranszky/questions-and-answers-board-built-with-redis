import React from 'react';

const SVG = ({
  style = {},
  fill = 'none',
  width = '100%',
  className = 'inline-block fill-current h-6 w-6',
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
    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
  </svg>
);

export default SVG;
