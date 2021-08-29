const admin = require('firebase-admin')
const serviceAccount = require('./adminKeys.json')

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
} catch {}

export const firestore = admin.firestore()
