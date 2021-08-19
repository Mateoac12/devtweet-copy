import PropTypes from 'prop-types'
import styles from './Title.module.css'

export const Title = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
}
