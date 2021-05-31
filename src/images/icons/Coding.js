import React from 'react';
import src from './coding.svg';

const SVG = ({ className, imageStyle, alt }) => (
  <img className={className} style={imageStyle} src={src} alt={alt} />
);

export default SVG;
