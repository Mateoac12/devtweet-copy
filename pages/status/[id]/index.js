import { AppContainer } from 'components/Layouts/AppContainer'
import DevTweet from 'components/Molecules/DevTweet'

const DevTweetDetail = (props) => {
  return (
    <AppContainer>
      <DevTweet {...props} />
    </AppContainer>
  )
}

DevTweetDetail.getInitialProps = (context) => {
  const { query } = context
  const { id } = query
  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json()
  })
}

export default DevTweetDetail
