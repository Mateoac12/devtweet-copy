import { useEffect, useState } from 'react'
import { onAuthChanged } from '../firebase/client'

export const useUser = () => {
  const [user, setUser] = useState(null)
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  useEffect(() => {
    onAuthChanged(setUser, setIsUserLoaded)
  }, [])

  return {
    user,
    isUserLoaded,
  }
}
