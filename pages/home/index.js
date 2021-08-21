import { Avatar } from 'components/Atoms/Avatar'
import { AppContainer } from 'components/Layouts/AppContainer'
import Head from 'next/head'
import { useEffect, useState } from 'react'

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
              <Avatar src={avatar} alt={username} />
              <h2>{username}</h2>
              <p>{message}</p>
            </article>
          ))}
        </section>
        <nav>menu</nav>
      </AppContainer>
    </>
  )
}

export default HomePage
