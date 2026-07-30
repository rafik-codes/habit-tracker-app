import AsyncStorage from "@react-native-async-storage/async-storage";

// مفتاح تخزين العادات
const HABITS_STORAGE_KEY = "@my_habits_list";

// حفظ قائمة العادات محلياً
export async function saveHabits(habits: any[]) {
  try {
    const jsonValue = JSON.stringify(habits);
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, jsonValue);
    console.log("تم حفظ العادات بنجاح!");
  } catch (error) {
    console.error("حدث خطأ أثناء حفظ العادات:", error);
  }
}

// استرجاع قائمة العادات المحفوظة
export async function loadHabits() {
  try {
    const jsonValue = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("حدث خطأ أثناء قراءة العادات:", error);
    return [];
  }
}
