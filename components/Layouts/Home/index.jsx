import { memo } from 'react'
import PropTypes from 'prop-types'
import { LoginMethods } from '../LoginMethods'
import { Title } from 'components/Atoms/Title'

const HomePage = ({ user }) => {
  return (
    <>
      <Title>Bienvenido a DevTweet!</Title>

      {user === null ? <LoginMethods /> : <h1>{user.username}</h1>}
    </>
  )
}

HomePage.propTypes = {
  user: PropTypes.object,
}

export default memo(HomePage)
