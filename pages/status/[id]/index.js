import { AppContainer } from 'components/Layouts/AppContainer'
import DevTweet from 'components/Molecules/DevTweet'

const DevTweetDetail = (props) => {
  return (
    <AppContainer>
      <DevTweet {...props} />
    </AppContainer>
  )
}

export default DevTweetDetail

/* DevTweetDetail.getInitialProps = (context) => {
  const { query } = context
  const { id } = query
  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json()
  })
} */

// 👆🏻 tambien se puede hacer de la manera de aqui abajo 👇🏻 (y es la mas correcta actualmente)
export const getServerSideProps = async (context) => {
  const { params, res } = context
  const { id } = params

  const initialProps = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (initialProps.ok) {
    const props = await initialProps.json()
    return {
      props,
    }
  }
  if (res) {
    res.writeHead(301, { Location: '/home' }).end()
  }
}
