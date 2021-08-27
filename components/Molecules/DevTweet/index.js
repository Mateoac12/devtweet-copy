import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'components/Atoms/Avatar'
import { useTimeAgo } from 'hooks/useTimeAgo'
import { uploadDevTweet } from 'firebase/client'

const DevTweet = ({
  id,
  avatar,
  username,
  normalizedDate,
  content,
  likesCount,
}) => {
  const timeAgo = useTimeAgo(normalizedDate)
  const [isLiked, setIsLiked] = useState(false)
  const handleUpdateLikes = () => {
    setIsLiked((lastValue) => !lastValue)
    uploadDevTweet(id, {
      propertyName: 'likesCount',
      value: likesCount + 1,
    })
  }

  return (
    <>
      <article key={id}>
        <Avatar src={avatar} alt={username} />

        <div>
          <h2>
            {username} <span>{timeAgo}</span>
          </h2>
          <p>{content}</p>
          <footer>
            <span>{likesCount}</span>
            <input
              id={`likesChecker-${id}`}
              type="checkbox"
              onClick={handleUpdateLikes}
              value={isLiked}
            />
            <label htmlFor={`likesChecker-${id}`}></label>
          </footer>
        </div>
      </article>
      <style jsx>{`
        article {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid #eeeeee;
          padding: 0.5rem;
          background-color: #fff;
        }

        input {
          display: none;
        }

        input:checked + label {
          filter: brightness(0.5);
        }

        label {
          background-color: red;
          display: inline-block;
          height: 10px;
          margin: 0 10px;
          position: relative;
          top: 0;
          transform: rotate(-45deg);
          width: 10px;
        }

        label:before,
        label:after {
          content: '';
          background-color: red;
          border-radius: 50%;
          height: 10px;
          position: absolute;
          width: 10px;
        }

        label:before {
          top: -5px;
          left: 0;
        }

        label:after {
          left: 5px;
          top: 0;
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
