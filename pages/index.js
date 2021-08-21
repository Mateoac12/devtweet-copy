import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

import { Loading } from '../components/Layouts/Loading'
import HomePage from '../components/Layouts/Home'
import { AppContainer } from 'components/Layouts/AppContainer'

import { useUser } from 'hooks/useUser'

import styles from '../styles/Home.module.css'

export default function Home() {
  const { user, isUserLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

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
