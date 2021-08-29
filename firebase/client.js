import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCR5DmY0hqwGF42g_zmspzf8Ooku_bw3TY',
  authDomain: 'devtweet-copy.firebaseapp.com',
  projectId: 'devtweet-copy',
  storageBucket: 'devtweet-copy.appspot.com',
  messagingSenderId: '218651791759',
  appId: '1:218651791759:web:ba36ed886520c8e15dfbfa',
  measurementId: 'G-941FWFW16W',
}

firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const mapUserFromFirebaseAuth = (user) => {
  const { email, displayName, photoURL, uid } = user
  return {
    uid,
    email,
    username: displayName,
    avatar: photoURL,
  }
}

export const onAuthChanged = (setUser, setIsUserLoaded) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const normalizedUser = user && mapUserFromFirebaseAuth(user)
      setUser(normalizedUser)
    }
    setIsUserLoaded(true)
  })
}

export const onAuthWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const onAuthWithTwitter = () => {
  const twitterProvider = new firebase.auth.TwitterAuthProvider()
  return firebase.auth().signInWithPopup(twitterProvider)
}

export const onAuthWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const createTweet = (tweet) => {
  const normalizedDevTweet = {
    ...tweet,
    date: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sheredCount: 0,
  }
  return db.collection('devtweets').add(normalizedDevTweet)
}

export const uploadDevTweet = (devTweetID, { propertyName, value }) => {
  return db
    .collection('devtweets')
    .doc(devTweetID)
    .update({
      [propertyName]: value,
    })
}

const mapDevTweetsFromFirebaseToObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const normalizedDate = +data.date.toDate()

  return {
    ...data,
    normalizedDate,
    id,
  }
}

export const fetchLastestDevTweets = () => {
  return db
    .collection('devtweets')
    .orderBy('date', 'desc')
    .get()
    .then((data) => {
      return data.docs.map(mapDevTweetsFromFirebaseToObject)
    })
}

export const listenLastestDevTweets = (callback) => {
  return db
    .collection('devtweets')
    .orderBy('date', 'desc')
    .onSnapshot(({ docs }) => {
      const newDevtweets = docs.map(mapDevTweetsFromFirebaseToObject)
      callback(newDevtweets)
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
