import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Habit {
  id: string;
  name: string;
  isCompleted: boolean;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [text, setText] = useState("");

  // 1. جلب العادات من سحابة Firebase

  const fetchHabits = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "habits"));
      const habitsList = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        name: docSnap.data().name || docSnap.data().title || "",
        isCompleted: docSnap.data().isCompleted || false,
      })) as Habit[];
      setHabits(habitsList);
    } catch (e) {
      console.error("خطأ في جلب البيانات من Firebase:", e);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // 2. إضافة عادة جديدة إلى Firebase
  const addHabit = async (habitName: string) => {
    const targetName = habitName || text;
    if (!targetName.trim()) return;

    try {
      await addDoc(collection(db, "habits"), {
        name: targetName,
        isCompleted: false,
        createdAt: new Date(),
      });
      setText("");
      fetchHabits(); // تحديث القائمة فوراً
    } catch (e) {
      console.error("خطأ أثناء إضافة العادة:", e);
    }
  };

  // 3. حذف عادة من Firebase
  const deleteHabit = async (id: string) => {
    try {
      await deleteDoc(doc(db, "habits", id));
      fetchHabits();
    } catch (e) {
      console.error("خطأ أثناء حذف العادة:", e);
    }
  };

  // 4. تبديل حالة إتمام العادة في Firebase
  const toggleHabit = async (id: string) => {
    try {
      const habitToUpdate = habits.find((h) => h.id === id);
      if (!habitToUpdate) return;

      const habitRef = doc(db, "habits", id);
      await updateDoc(habitRef, {
        isCompleted: !habitToUpdate.isCompleted,
      });
      fetchHabits();
    } catch (e) {
      console.error("خطأ أثناء تحديث حالة العادة:", e);
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
