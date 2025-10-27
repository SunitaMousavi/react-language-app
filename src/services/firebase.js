// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

export default app;
