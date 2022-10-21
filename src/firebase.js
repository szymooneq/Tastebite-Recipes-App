import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tastebite-recipe-app.firebaseapp.com",
  projectId: "tastebite-recipe-app",
  storageBucket: "tastebite-recipe-app.appspot.com",
  messagingSenderId: "1016386691550",
  appId: "1:1016386691550:web:3fe60663a5b4138870bd4f"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app);
