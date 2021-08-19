import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import { onAuthChanged } from '../firebase/client'

import { Loading } from '../components/Layouts/Loading'
import HomePage from '../components/Layouts/Home'
import { AppContainer } from 'components/Layouts/AppContainer'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  useEffect(() => {
    onAuthChanged(setUser, setIsUserLoaded)
  }, [])

  return (
    <AppContainer>
      <Head>
        <title>DevTweet</title>
        <meta name="description" content="Created tweets about developments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isUserLoaded ? !user && <HomePage /> : <Loading />}
      </main>
    </AppContainer>
  )
}
