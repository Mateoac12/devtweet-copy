import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Avatar } from 'components/Atoms/Avatar'
import { AppContainer } from 'components/Layouts/AppContainer'

const HomePage = () => {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('/api/statuses/homeTimeLine')
      .then((data) => data.json())
      .then(setTimeline)
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
          Listado de todos los tweets
          {timeline.map(({ avatar, username, message, id }) => (
            <article key={id}>
              <header>
                <Avatar src={avatar} alt={username} />
                <h2>{username}</h2>
              </header>
              <p>{message}</p>
            </article>
          ))}
        </section>
        <nav>
          <Link href="compose/devtweet">
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
        }

        article {
          border-bottom: 1px solid #eeeeee;
          padding: 0 0.5rem;
        }

        article > header {
          display: flex;
          align-items: center;
        }

        h2 {
          font-size: 18px;
          margin-left: 0.5rem;
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
