import PropTypes from 'prop-types'
import styles from './Button.module.css'

export const Button = ({ onClick, children }) => {
  return (
    <>
      <button onClick={onClick} className={styles.btn}>
        {children}
      </button>
    </>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
