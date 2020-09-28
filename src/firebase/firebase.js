import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyC_jH557QASYoBCCSRR2oo-B1t59sGeml4',
  databaseURL: 'https://contact-book-id.firebaseio.com',
  projectId: 'contact-book-id',
  messagingSenderId: '723431530391',
  storageBucket: 'contact-book-id.appspot.com'
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()
const storage = firebaseApp.storage()

export {
  firebase,
  db,
  storage
}
