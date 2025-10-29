import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";

export class FirestoreService {
  static async getVocabularyByLevel(level) {
    const vocabRef = collection(db, "vocabulary");
    const q = query(vocabRef, where("cefrLevel", "==", level));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async getAllVocabulary() {
    const vocabRef = collection(db, "vocabulary");
    const snapshot = await getDocs(vocabRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async getUserProgress(userId) {
    const progressRef = doc(db, "userProgress", userId);
    const snapshot = await getDoc(progressRef);

    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      const initialProgress = {
        userId,
        dailyLimit: 20,
        levels: {},
        lastStudied: null,
        createdAt: new Date(),
      };
      await setDoc(progressRef, initialProgress);
      return initialProgress;
    }
  }

  static async updateUserProgress(userId, updates) {
    const progressRef = doc(db, "userProgress", userId);
    await updateDoc(progressRef, updates);
  }

  static async updateCardProgress(userId, cardId, cardDate) {
    const progressRef = doc(db, "userProgress", userId);

    await updateDoc(progressRef, {
      [`cards.${cardId}`]: cardDate,
      lastStudied: new Date(),
    });
  }

  static async updateDailyLimit(userId, newLimit) {
    const progressRef = doc(db, "userProgress", userId);
    await updateDoc(progressRef, {
      dailyLimit: newLimit,
    });
  }

  static async getDueCards(userId, level = null) {
    const progress = await this.getUserProgress(userId);
    const allVocabulary = await this.getAllVocabulary();
    const now = new Date();

    return allVocabulary.filter((card) => {
      const cardProgress = progress.cards?.[card.id];

      if (level && card.cefrLevel !== level) return false;

      if (!cardProgress) return true;

      const nextReview = new Date(cardProgress.nextReview);
      return nextReview <= now;
    });
  }
}
