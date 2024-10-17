import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, getReactNativePersistence } from 'firebase/auth';

let auth;

const firebaseConfig = {
    apiKey: "AIzaSyD6fAf1THGc2LcVTtLNtw9KU1cRyYqguPc",
    authDomain: "your-auth-domain",
    projectId: "jobs-ready-jobs-api",
    storageBucket: "jobs-ready-jobs-api.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "1:566185420875:android:e2724f44fe43f219b5c5ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const firestore = getFirestore(app);

// Initialize Firebase Auth with React Native persistence

// For Web, use indexedDBLocalPersistence or browserLocalPersistence
auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence || browserLocalPersistence,
});

export default auth;