import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

// Add one flashcard to Firestore
export async function addCard(cardData) {
  try {
    const docRef = await addDoc(collection(db, "flashcards"), {
      ...cardData,
      createdAt: new Date(),
      interval: cardData.interval || 0,
      repetitions: cardData.repetitions || 0,
      easeFactor: cardData.easeFactor || 2.5,
      dueDate: cardData.dueDate || new Date(),
    });
    console.log("Card saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
}

// Get all flashcards from Firestore
export async function getAllCards() {
  try {
    const querySnapshot = await getDocs(collection(db, "flashcards"));
    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cards;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
}

// Get flashcards by user ID
export async function getCardsByUser(userId) {
  try {
    const q = query(
      collection(db, "flashcards"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cards;
  } catch (error) {
    console.error("Error fetching user cards:", error);
    return [];
  }
}

// Update a specific card
export async function updateCard(cardId, updates) {
  try {
    const cardRef = doc(db, "flashcards", cardId);
    await updateDoc(cardRef, {
      ...updates,
      lastReviewed: new Date(),
    });
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
}

// Delete a card
export async function deleteCard(cardId) {
  try {
    await deleteDoc(doc(db, "flashcards", cardId));
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
}

// Save user progress
export async function saveUserProgress(userId, progressData) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        ...progressData,
        lastUpdated: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error saving user progress:", error);
    throw error;
  }
}

// Get user progress
export async function getUserProgress(userId) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user progress:", error);
    return null;
  }
}

// Save user settings
export async function saveUserSettings(userId, settings) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        settings,
        lastUpdated: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error saving user settings:", error);
    throw error;
  }
}
