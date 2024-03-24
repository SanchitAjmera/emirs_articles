// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCtgnybUhzHewn3n8CLrce8MQyKesyQhM",
  authDomain: "emirs-articles.firebaseapp.com",
  projectId: "emirs-articles",
  storageBucket: "emirs-articles.appspot.com",
  messagingSenderId: "65734696519",
  appId: "1:65734696519:web:f0b15603a7bf632cac1b62",
  measurementId: "G-3JJKZ5D51X"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;