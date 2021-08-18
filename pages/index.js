import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { onAuthChanged } from '../firebase/client'
import { LoginMethods } from '../components/Layouts/LoginMethods'

export default function Home() {
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthChanged(setUser, setIsUserLoaded)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>DevTweet - Home 🏠</title>
        <meta name="description" content="Created tweets about developments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a DevTweet!
        </h1>
        {
          isUserLoaded
            ? (
              user === null
                ? (
                  <LoginMethods />
                )
                : <h1>{user.username}</h1>
            )
            : <h1>Loading...</h1>
        }
       
      </main>
    </div>
  )
}
