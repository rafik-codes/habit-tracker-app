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
  apiKey: "AIzaSyBjFGul_jBe69mfVs45JyLduDxWqpfwHdg",
  authDomain: "habitapp-rafik.firebaseapp.com",
  projectId: "habitapp-rafik",
  storageBucket: "habitapp-rafik.firebasestorage.app",
  messagingSenderId: "401567783314",
  appId: "1:401567783314:web:39972d1d63e3761d06494b",
  measurementId: "G-XHBVJ1DF4N",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

// تصدير الأدوات لاستخدامها في شاشات التطبيق المختلفة
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
