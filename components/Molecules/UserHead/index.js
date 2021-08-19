import PropTypes from 'prop-types'
import { Avatar } from 'components/Atoms/Avatar'
import { Title } from 'components/Atoms/Title'

import styles from './styles'

export const UserHead = ({ user }) => {
  return (
    <>
      <div>
        <Avatar imgURL={user.avatar} alt={user.username} />
        <Title>{user.username}</Title>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

UserHead.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}
