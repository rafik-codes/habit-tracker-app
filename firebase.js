// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // أداة قاعدة البيانات لتخزين العادات
import { getAuth } from "firebase/auth"; // أداة تسجيل الدخول والمصادقة

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const saveHabitToFirebase = async (habitTitle) => {
  try {
    await addDoc(collection("habits"), {
      title: habitTitle,
      isCompleted: false,
      createdAt: new Date(),
    });
    console.log("تمت المزامنة السحابية بنجاح! ☁️");
  } catch (e) {
    console.error("خطأ في الحفظ السحابي: ", e);
  }
};
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

// تصدير الأدوات لاستخدامها في شاشات التطبيق المختلفة
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
