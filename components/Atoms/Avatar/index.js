import PropTypes from 'prop-types'
import styles from './styles'

export const Avatar = ({ imgURL, alt }) => {
  return (
    imgURL && (
      <>
        <img src={imgURL} alt={alt} />
        <style jsx>{styles}</style>
      </>
    )
  )
}

Avatar.propTypes = {
  imgURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}
