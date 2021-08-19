import { useEffect, useState } from 'react'
import Head from 'next/head'
import { onAuthChanged } from '../firebase/client'

import { Loading } from '../components/Layouts/Loading'
import HomePage from '../components/Layouts/Home'

import styles from '../styles/Home.module.css'

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
      {
        isUserLoaded
          ? <HomePage user={user} />
          : <Loading />
      }
      </main>
    </div>
  )
}
