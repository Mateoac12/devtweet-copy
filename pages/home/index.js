import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { AppContainer } from 'components/Layouts/AppContainer'
import { listenLastestDevTweets } from 'firebase/client'
import DevTweet from 'components/Molecules/DevTweet'
import { Loading } from 'components/Layouts/Loading'

const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const subscription = listenLastestDevTweets(setTimeline)
    setLoading(false)
    return () => subscription && subscription()
  }, [])

  return (
    <>
      <Head>
        <title>Home 🏠</title>
        <meta name="description" content="View all tweets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppContainer>
        <header>
          <h1>Inicio</h1>
        </header>
        <section>
          {!loading ? (
            timeline.map(
              ({
                content,
                id,
                avatar = '',
                username,
                likesCount,
                normalizedDate,
                image,
              }) => (
                <DevTweet
                  key={id}
                  id={id}
                  content={content}
                  avatar={avatar}
                  username={username}
                  likesCount={likesCount}
                  normalizedDate={normalizedDate}
                  image={image}
                />
              )
            )
          ) : (
            <Loading />
          )}
        </section>
        <nav>
          <Link href="/compose/devtweet">
            <a>Nuevo Devtweet</a>
          </Link>
        </nav>
      </AppContainer>
      <style jsx>{`
        h1 {
          padding: 0.25rem 0;
          padding-left: 1rem;
          font-size: 22px;
          border-bottom: 1px solid #eeeeee;
          margin-top: 0;
        }

        section {
          height: 100%;
          overflow-y: scroll;
        }

        article {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid #eeeeee;
          padding: 0.5rem;
          background-color: #fff;
        }

        body {
          padding-left: 1rem;
        }

        h2 {
          font-size: 16px;
          margin-top: 0;
          margin-bottom: 0;
        }

        a {
          margin: 1rem;
          padding: 0.5rem;
          border-radius: 25px;
          border: 1px solid #2993f7;
          background-color: #2993f790;
        }

        p {
          margin-top: 0;
          background-color: #fff;
        }

        nav {
          display: flex;
          align-items: center;
          border-top: 1px solid #eeeeee;
          padding: 0.25rem 0;
          height: 60px;
        }
      `}</style>
    </>
  )
}

export default HomePage
