import React from 'react';
import src from './idea-colored.svg';

const SVG = ({ className, imageStyle, alt }) => (
  <img className={className} style={imageStyle} src={src} alt={alt} />
);

export default SVG;
