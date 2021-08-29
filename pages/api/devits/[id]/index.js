import { firestore } from 'firebase/admin'

export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection('devtweets')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const normalizedDate = +data.date.toDate()

      res.json({
        ...data,
        normalizedDate,
        id,
      })
    })
    .catch(() => {
      res.status(404).end()
    })
}
