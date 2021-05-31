import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo, style = {}, className = '' }) => {
  const imageStyle = { ...style }
  const { alt = '', childImageSharp, image } = imageInfo

  // svg support
  if (!childImageSharp && image.extension === 'svg') {
    return <img className={className} style={imageStyle} src={image.publicURL} alt={alt} />
  }

  if (!!image && !!image.childImageSharp) {
    return (
      <Img className={className} style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!childImageSharp) {
    return <Img className={className} style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img className={className} style={imageStyle} src={image} alt={alt} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
  }).isRequired,
}

export default PreviewCompatibleImage
