import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBAdekiSt7kC-Mn2JkHl1RuW_CfTOZDHt0',
  authDomain: 'challenge-07-6cc12.firebaseapp.com',
  databaseURL: 'https://challenge-07-6cc12-default-rtdb.firebaseio.com',
  projectId: 'challenge-07-6cc12',
  storageBucket: 'challenge-07-6cc12.firebasestorage.app',
  messagingSenderId: '557727781161',
  appId: '1:557727781161:web:9c9d33f211cf409e8e6738',
  measurementId: 'G-LCB3KTPY80',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
