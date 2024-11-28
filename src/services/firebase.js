// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgBilqngSG5SXrAL7SoBqEgI1qA3BRHC8",
  authDomain: "movie-firebase-4f806.firebaseapp.com",
  projectId: "movie-firebase-4f806",
  storageBucket: "movie-firebase-4f806.firebasestorage.app",
  messagingSenderId: "702343540424",
  appId: "1:702343540424:web:b0473d3a6f88eab015fffd",
  measurementId: "G-0BMWY5VWP3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore Database

export { auth, db };
// const analytics = getAnalytics(app);
