import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/Atoms/Avatar'
import { useTimeAgo } from 'hooks/useTimeAgo'
import { uploadDevTweet } from 'firebase/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

const DevTweet = ({
  id,
  avatar,
  username,
  normalizedDate,
  content,
  likesCount,
  image,
}) => {
  const router = useRouter()
  const timeAgo = useTimeAgo(normalizedDate)
  const [isLiked, setIsLiked] = useState(false)
  const handleUpdateLikes = (e) => {
    e.stopPropagation()
    setIsLiked((lastValue) => !lastValue)
    uploadDevTweet(id, {
      propertyName: 'likesCount',
      value: likesCount + 1,
    })
  }

  const handleViewDetails = (e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`status/${id}`)
  }

  return (
    <>
      <article key={id} onClick={handleViewDetails}>
        <Avatar src={avatar} alt={username} />

        <div>
          <h2>
            {username}
            <Link href={`status/${id}`}>
              <time dateTime={timeAgo}>{timeAgo}</time>
            </Link>
          </h2>
          <p>{content}</p>
          {image && <img src={image} />}
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

        article:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.03);
        }

        input {
          display: none;
        }

        input:checked + label {
          filter: brightness(0.5);
        }

        time {
          font-weight: 400;
          font-size: 12px;
          color: #ccc;
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
          width: 100%;
        }

        img {
          border-radius: 10px;
          width: 100%;
          max-width: 80%;
        }

        h2 {
          font-size: 16px;
          margin-top: 0;
          margin-bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
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

export default React.memo(DevTweet)

DevTweet.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  normalizedDate: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  image: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
}
