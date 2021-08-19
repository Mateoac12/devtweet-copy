import { memo } from 'react'
import { LoginMethods } from "../LoginMethods"
import { Title } from '../../Atoms/Title'

const HomePage = ({ user }) => {
  return (
    <>
      <Title>Bienvenido a DevTweet!</Title>

      {
        user === null
          ? <LoginMethods />
          : <h1>{user.username}</h1>
      }

    </>
  )
}

export default memo(HomePage)