import { memo } from 'react'
import { LoginMethods } from '../LoginMethods'
import { Title } from 'components/Atoms/Title'

const HomePage = () => {
  return (
    <>
      <Title>Bienvenido a DevTweet!</Title>
      <LoginMethods />
    </>
  )
}

export default memo(HomePage)
