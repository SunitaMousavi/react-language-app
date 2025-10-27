// firestoreService.js
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export async function addUserData(userData) {
  try {
    await addDoc(collection(db, "users"), userData);
    console.log("Data saved!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
