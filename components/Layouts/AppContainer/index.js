import PropTypes from 'prop-types'
import styles, { globalStyles } from './styles'

export const AppContainer = ({ children }) => {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
}
