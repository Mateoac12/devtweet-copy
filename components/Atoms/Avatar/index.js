import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

const Avatar = ({ src, alt }) => {
  return (
    src && (
      <>
        <img src={src} alt={alt} />
        <style jsx>{styles}</style>
      </>
    )
  )
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default React.memo(Avatar)
