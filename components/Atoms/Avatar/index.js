import PropTypes from 'prop-types'
import styles from './styles'

export const Avatar = ({ src, alt }) => {
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
