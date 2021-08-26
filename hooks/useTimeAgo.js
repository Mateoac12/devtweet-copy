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
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export const useTimeAgo = (timestamp) => {
  const { value, unit } = getExactTimeAgo(timestamp)
  const shortTimeExpresion = new Intl.RelativeTimeFormat('es', {
    style: 'short',
  })

  const dateAgo = shortTimeExpresion.format(value, unit)
  return dateAgo
}
