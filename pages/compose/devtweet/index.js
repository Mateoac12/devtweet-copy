import { useEffect, useState } from 'react'
import { useUser } from 'hooks/useUser'
import { AppContainer } from 'components/Layouts/AppContainer'
import { createTweet, uploadImage } from 'firebase/client'
import { useRouter } from 'next/dist/client/router'
import Avatar from 'components/Atoms/Avatar'

const DevTweetPage = () => {
  const STATUS = {
    USER_NOT_KNOWN: 0,
    NOT_CONTENT: 1,
    SUBMIT_LOADING: 2,
  }
  const DRAG_IMAGE_STATE = {
    ERROR: -2,
    NONE: -1,
    DRAG_OVER: 0,
    DRAG_LOADING: 1,
    UPLOADING: 2,
    COMPLEATE: 3,
  }

  const [submitPermision, setSubmitPermision] = useState(STATUS.USER_NOT_KNOWN)
  const [content, setContent] = useState('')

  const [drag, setDrag] = useState(DRAG_IMAGE_STATE.NONE)
  const [task, setTask] = useState(null)
  const [image, setImage] = useState(null)

  const router = useRouter()
  const { user } = useUser()
  const uid = user?.uid
  const avatar = user?.avatar
  const username = user?.username

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const getErrors = () => {}
      const getComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setImage)
      }

      task.on('state_changed', onProgress, getErrors, getComplete)
    }
  }, [task])

  const handleCreateDevTweet = (e) => {
    e.preventDefault()
    setSubmitPermision(STATUS.SUBMIT_LOADING)
    const devTweetStructure = {
      uid,
      avatar,
      username,
      content,
      image,
    }
    createTweet(devTweetStructure).then(router.replace('/home'))
  }

  const disabled = !content.length || submitPermision === STATUS.SUBMIT_LOADING

  const handleDrop = (e) => {
    e.preventDefault()

    setDrag(DRAG_IMAGE_STATE.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }
  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATE.NONE)
  }

  return (
    <>
      <AppContainer>
        <form onSubmit={handleCreateDevTweet}>
          <figure>
            <Avatar src={avatar || ''} alt={username || ''} />
            <h3>{username}</h3>
          </figure>
          <textarea
            placeholder="Que esta pasando?"
            value={content}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onChange={(event) => setContent(event.target.value)}
          />
          {image && <img src={image} />}
          <button disabled={disabled}>Devtweetear</button>
        </form>
      </AppContainer>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          height: 100%;
          margin: 1rem;
        }

        textarea {
          resize: none;
          width: 100%;
          height: 400px;
          border: ${drag === DRAG_IMAGE_STATE.DRAG_OVER
            ? '3px dashed #09f'
            : '3px solid transparent'};
          border-radius: 10px;
          outline: none;
          padding: 1rem;
          font-size: 18px;
          flex: 1;
        }
        figure {
          margin: 0;
          display: flex;
          align-items: center;
          column-gap: 0.5rem;
          border-bottom: 1px dashed #ccc;
          padding: 0 1rem;
        }

        img {
          max-width: 80%;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          border-radius: 10px;
        }

        button {
          margin: 2rem;
          align-self: flex-end;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          border: 1px solid transparent;
          color: #fff;
          background-color: #161616;
          cursor: pointer;
          font-size: 16px;
          filter: brightness(1);
          transition: filter 0.3s;
        }

        button:hover {
          filter: brightness(1.2);
        }

        button:disabled {
          cursor: none;
          filter: brightness(5);
        }
      `}</style>
    </>
  )
}

export default DevTweetPage
