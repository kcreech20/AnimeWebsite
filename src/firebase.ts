// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvlomvMG-FtmBuwbNUEkk-IV7iY3H423I",
  authDomain: "animewebsite-dba6c.firebaseapp.com",
  projectId: "animewebsite-dba6c",
  storageBucket: "animewebsite-dba6c.appspot.com",
  messagingSenderId: "90435797089",
  appId: "1:90435797089:web:a9678e0fbc35218c9eea20",
  measurementId: "G-KXR8ZVYER6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
