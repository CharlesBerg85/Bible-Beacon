import firebase from 'firebase/app';
import 'firebase/firestore'; // If you are using Firestore
import 'firebase/auth'; // If you are using Authentication
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Check if Firebase is already initialized to prevent reinitialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firebase modules as needed
export const db = firebase.firestore();
export const auth = firebase.auth();
// Add other Firebase modules you need (e.g., storage, real-time database, etc.)
