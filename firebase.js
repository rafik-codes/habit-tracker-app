// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // أداة تسجيل الدخول والمصادقة

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjFGul_jBe69mfVs45JyLduDxWqpfwHdg",
  authDomain: "habitapp-rafik.firebaseapp.com",
  projectId: "habitapp-rafik",
  storageBucket: "habitapp-rafik.firebasestorage.app",
  messagingSenderId: "401567783314",
  appId: "1:401567783314:web:39972d1d63e3761d06494b",
};

// Initialize Firebase (Analytics غير مدعومة على React Native، فتم حذفها)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// تصدير الأدوات لاستخدامها في شاشات التطبيق المختلفة
export const db = getFirestore(app);
export const auth = getAuth(app);
export const isFirebaseConfigured = true;

export const saveHabitToFirebase = async (habitTitle) => {
  try {
    await addDoc(collection(db, "habits"), {
      title: habitTitle,
      isCompleted: false,
      createdAt: new Date(),
    });
    console.log("تمت المزامنة السحابية بنجاح! ☁️");
  } catch (e) {
    console.error("خطأ في الحفظ السحابي: ", e);
  }
};

export default app;
