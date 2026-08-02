import React, { createContext, useContext, useEffect, useState } from "react";
import { db as firebaseDb, isFirebaseConfigured } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  type Firestore,
} from "firebase/firestore";
import { loadHabits, saveHabits } from "./storageService";

// تحديد هيكل البيانات للعادة
export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
  //
  streak?: number;
  lastCompletedDate?: string | null;
}

interface HabitsContextType {
  habits: Habit[];
  addHabit: (name: string) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;

  toggleHabitCompletion: (id: string) => Promise<void>;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const db = firebaseDb as unknown as Firestore | null;
  const [habits, setHabits] = useState<Habit[]>([]);

  // 1. جلب العادات من Firestore عند تحميل الصفحة
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
      const loadedHabits: Habit[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Habit, "id">),
      }));
      setHabits(loadedHabits);
      await saveHabits(loadedHabits);
    } catch (error) {
      console.error("Error fetching habits: ", error);
    }
  };

  useEffect(() => {
    void fetchHabits();
  }, []);

  // 2. إضافة عادة جديدة إلى قاعدة البيانات
  const addHabit = async (name: string) => {
    const newHabit = {
      name,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };

    setHabits((prev) => [...prev, { id: `local-${Date.now()}`, ...newHabit }]);
    await saveHabits(habits);

    if (!db || !isFirebaseConfigured) {
      return;
    }

    try {
      const firestoreDb = db as Firestore;
      const docRef = await addDoc(collection(firestoreDb, "habits"), newHabit);
      setHabits((prev) => [...prev.filter((habit) => !habit.id.startsWith("local-")), { id: docRef.id, ...newHabit }]);
    } catch (error) {
      console.error("Error adding habit: ", error);
    }
  };

  // 3. حذف عادة من قاعدة البيانات
  const deleteHabit = async (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    await saveHabits(habits.filter((habit) => habit.id !== id));

    if (!db || !isFirebaseConfigured) {
      return;
    }

    try {
      const firestoreDb = db as Firestore;
      await deleteDoc(doc(firestoreDb, "habits", id));
    } catch (error) {
      console.error("Error deleting habit: ", error);
    }
  };

  // --- ضع هذه الدالة هنا في نهاية الدوال الموجودة لديك وقبل الـ return مباشرة ---

  const toggleHabitCompletion = async (habitId: string) => {
    const today = new Date().toISOString().split("T")[0]; // تاريخ اليوم YYYY-MM-DD

    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId) {
          const isCompletedToday = habit.lastCompletedDate === today;
          let newStreak = habit.streak || 0;

          if (!isCompletedToday) {
            // إذا لم يحددها اليوم، زيد السلسلة بواحد
            newStreak += 1;
          } else {
            // إذا أزال التحديد، انقص السلسلة
            newStreak = Math.max(0, newStreak - 1);
          }

          return {
            ...habit,
            streak: newStreak,
            lastCompletedDate: isCompletedToday ? null : today,
          };
        }
        return habit;
      }),
    );

    // (اختياري) إذا كنت تقوم بحفظ التغييرات في Firebase هنا، استمر في كود الحفظ الخاص بك
  };

  return (
    <HabitsContext.Provider
      value={{ habits, addHabit, deleteHabit, toggleHabitCompletion }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context)
    throw new Error("useHabits must be used within a HabitsProvider");
  return context;
};
