import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'components/Atoms/Avatar'
import { useTimeAgo } from 'hooks/useTimeAgo'

const DevTweet = ({
  id,
  avatar,
  username,
  normalizedDate,
  content,
  likesCount,
}) => {
  const timeAgo = useTimeAgo(normalizedDate)
  return (
    <>
      <article key={id}>
        <Avatar src={avatar} alt={username} />

        <div>
          <h2>
            {username} <span>{timeAgo}</span>
          </h2>
          <p>{content}</p>
        </div>
        <footer>
          <span>{likesCount}</span>
          <button>Likes</button>
        </footer>
      </article>
      <style jsx>{`
        article {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid #eeeeee;
          padding: 0.5rem;
          background-color: #fff;
        }

        div {
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

export default React.memo(DevTweet)

DevTweet.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  normalizedDate: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
}
