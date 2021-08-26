import { useEffect, useState } from 'react'

const DATE_RULES = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

const getExactTimeAgo = (devTweetedAt) => {
  const instantTime = Date.now()
  const elapsed = (devTweetedAt - instantTime) / 1000

  for (const [unit, secondsInUnit] of DATE_RULES) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export const useTimeAgo = (timestamp) => {
  const [exactTime, setExactTime] = useState(() => getExactTimeAgo(timestamp))
  const { value, unit } = exactTime
  const shortTimeExpresion = new Intl.RelativeTimeFormat('es', {
    style: 'short',
  })

  useEffect(() => {
    if (unit === 'second') {
      const timeInterval = setInterval(() => {
        const newTimeAgo = getExactTimeAgo(timestamp)
        setExactTime(newTimeAgo)
      }, 5000)

      return () => clearInterval(timeInterval)
    }
  }, [exactTime])

  const dateAgo = shortTimeExpresion.format(value, unit)
  return dateAgo
}
