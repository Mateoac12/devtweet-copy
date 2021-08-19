import { memo } from 'react'
import { LoginMethods } from "../LoginMethods"

import styles from '../../../styles/Home.module.css'

const HomePage = ({ user }) => {
  return (
    <>
      <h1 className={styles.title}>
        Bienvenido a DevTweet!
      </h1>

      {
        user === null
          ? <LoginMethods />
          : <h1>{user.username}</h1>
      }

    </>
  )
}

export default memo(HomePage)