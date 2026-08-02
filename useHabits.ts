import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  type Firestore,
} from "firebase/firestore";
import { db as firebaseDb, isFirebaseConfigured } from "./firebase";
import { loadHabits, saveHabits } from "./storageService";

export interface Habit {
  id: string;
  name: string;
  isCompleted: boolean;
}

export function useHabits() {
  const db = firebaseDb as unknown as Firestore | null;
  const [habits, setHabits] = useState<Habit[]>([]);
  const [text, setText] = useState("");

  const syncLocalHabits = async (nextHabits: Habit[]) => {
    setHabits(nextHabits);
    await saveHabits(nextHabits);
  };

  const fetchHabits = async () => {
    const storedHabits = await loadHabits();
    if (storedHabits.length) {
      setHabits(storedHabits);
    }

    if (!db || !isFirebaseConfigured) {
      return;
    }

    try {
      const firestoreDb = db as Firestore;
      const querySnapshot = await getDocs(collection(firestoreDb, "habits"));
      const habitsList = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        name: docSnap.data().name || docSnap.data().title || "",
        isCompleted: Boolean(docSnap.data().isCompleted),
      })) as Habit[];
      await syncLocalHabits(habitsList);
    } catch (error) {
      console.warn("Unable to sync habits from Firebase; using local data.", error);
    }
  };

  useEffect(() => {
    void fetchHabits();
  }, []);

  const addHabit = async (habitName: string) => {
    const targetName = habitName || text;
    if (!targetName.trim()) return;

    const newHabit: Habit = {
      id: `local-${Date.now()}`,
      name: targetName.trim(),
      isCompleted: false,
    };

    const nextHabits = [newHabit, ...habits];
    await syncLocalHabits(nextHabits);
    setText("");

    if (!db || !isFirebaseConfigured) {
      return;
    }

    try {
      const firestoreDb = db as Firestore;
      await addDoc(collection(firestoreDb, "habits"), {
        name: targetName.trim(),
        isCompleted: false,
        createdAt: new Date().toISOString(),
      });
      await fetchHabits();
    } catch (error) {
      console.warn("Unable to persist habit to Firebase; stored locally instead.", error);
    }
  };

  const deleteHabit = async (id: string) => {
    const nextHabits = habits.filter((habit) => habit.id !== id);
    await syncLocalHabits(nextHabits);

    if (!db || !isFirebaseConfigured) {
      return;
    }

    try {
      const firestoreDb = db as Firestore;
      await deleteDoc(doc(firestoreDb, "habits", id));
      await fetchHabits();
    } catch (error) {
      console.warn("Unable to delete habit from Firebase; removed locally instead.", error);
    }
  };

  const toggleHabit = async (id: string) => {
    const habitToUpdate = habits.find((habit) => habit.id === id);
    if (!habitToUpdate) return;

    const nextHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit,
    );
    await syncLocalHabits(nextHabits);

    if (!db || !isFirebaseConfigured) {
      return;
    }

    try {
      const firestoreDb = db as Firestore;
      const habitRef = doc(firestoreDb, "habits", id);
      await updateDoc(habitRef, {
        isCompleted: !habitToUpdate.isCompleted,
      });
      await fetchHabits();
    } catch (error) {
      console.warn("Unable to toggle habit in Firebase; updated locally instead.", error);
    }
  };

  return {
    habits,
    text,
    setText,
    addHabit,
    deleteHabit,
    toggleHabit,
  };
}
