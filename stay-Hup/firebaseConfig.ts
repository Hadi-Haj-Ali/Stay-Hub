import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAOcIauQ7QdmHPoiV3W15SLsEZ1AuN3Zz4',
  authDomain: 'stay-hub-563b9.firebaseapp.com',
  projectId: 'stay-hub-563b9',
  storageBucket: 'stay-hub-563b9.firebasestorage.app',
  messagingSenderId: '873532917201',
  appId: '1:873532917201:web:2b457a4fec1974f942ccf0',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);