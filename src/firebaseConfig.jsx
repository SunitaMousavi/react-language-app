// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPCHI2gSRMlUMaYFxZYXMdTIqnkx9RKMY",
  authDomain: "language-app-b691a.firebaseapp.com",
  projectId: "language-app-b691a",
  storageBucket: "language-app-b691a.firebasestorage.app",
  messagingSenderId: "699309335625",
  appId: "1:699309335625:web:f7fd00eb6fb63ce7534b98",
};

// Initialize Firebase
export const auth = getAuth(app);
// Initialize Firestore
export const app = initializeApp(firebaseConfig);
