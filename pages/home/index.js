import { AppContainer } from 'components/Layouts/AppContainer'
import Head from 'next/head'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home 🏠</title>
        <meta name="description" content="View all tweets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppContainer>
        <h1>Hola</h1>
      </AppContainer>
    </>
  )
}

export default HomePage
