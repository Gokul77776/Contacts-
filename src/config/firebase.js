// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7Z09eQqty4Wu3H5U3vylPKyjZqkniL48",
  authDomain: "vite-contact-434e3.firebaseapp.com",
  projectId: "vite-contact-434e3",
  storageBucket: "vite-contact-434e3.appspot.com",
  messagingSenderId: "293442126523",
  appId: "1:293442126523:web:59cd25a03db850a27e1f9e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);