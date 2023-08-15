// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv7Z-yreu_XFXNsg6eQPxpCDJbP1caqi0",
  authDomain: "phpd050502.firebaseapp.com",
  projectId: "phpd050502",
  storageBucket: "phpd050502.appspot.com",
  messagingSenderId: "73961586504",
  appId: "1:73961586504:web:c32c863e358dd1ec0dfd7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new FacebookAuthProvider();
export const provide = new GoogleAuthProvider();