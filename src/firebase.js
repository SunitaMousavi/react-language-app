// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4uVzYqtOPE614aqrrlpu74QVKLu8jefA",
  authDomain: "react-language-app-1e773.firebaseapp.com",
  projectId: "react-language-app-1e773",
  storageBucket: "react-language-app-1e773.firebasestorage.app",
  messagingSenderId: "576468562159",
  appId: "1:576468562159:web:431c67ef06808a57f46b1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
