import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyASF7nf20HNAP9Kypt8bZZLaPBbqBCUs7c',
  authDomain: 'parcial-2-b9964.firebaseapp.com',
  projectId: 'parcial-2-b9964',
  databaseURL: 'https://parcial-2-b9964-default-rtdb.firebaseio.com',
  storageBucket: 'parcial-2-b9964.firebasestorage.app',
  messagingSenderId: '146758482184',
  appId: '1:146758482184:web:127162c8c5c5d7045f14bd',
  measurementId: 'G-TZYXPN6YVY'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Initialize Realtime Database
export const db = getDatabase(app)

export default app
