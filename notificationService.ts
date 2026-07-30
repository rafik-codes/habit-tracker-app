import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// إعداد شكل ظهور الإشعار
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
} as any);

// دالة طلب الصلاحيات وجدولة التذكير
export async function scheduleDailyHabitReminder() {
  // 1. طلب الإذن من المستخدم
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("لم يتم منح صلاحية الإشعارات!");
    return;
  }

  // 2. جدولة إشعار يومي الساعة 8 مساءً مثلاً
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "وقت عاداتك اليومية! 🌟",
      body: "لا تنس إنجاز عاداتك اليومية والحفاظ على سلسلة التزامك.",
    },
    trigger: {
      hour: 20,
      minute: 0,
      repeats: true,
    } as any,
  });

  console.log("تم تفعيل التذكير اليومي بنجاح!");
}
// === أضف الدالتين الجديدتين هنا في النهاية ===
// جدولة إشعار في ساعة ودقيقة محددة يختارها المستخدم
export async function scheduleCustomHabitReminder(
  title: string,
  body: string,
  hour: number,
  minute: number,
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: "default",
    },
    trigger: {
      hour: hour,
      minute: minute,
      repeats: true,
    } as any,
  });
  console.log(`تم تفعيل التذكير المخصص الساعة ${hour}:${minute}`);
}

// إرسال إشعار فوري للتأكد من عمل النظام
export async function sendInstantNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: "default",
    },
    trigger: null, // إرسال فوري
  });
}

// --- أضف هذه الدالة في أسفل ملف notificationService.ts الحالي ---

export async function scheduleDailyReminder() {
  // 1. طلب إذن الإشعارات من المستخدم
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("لم يتم منح صلاحية الإشعارات!");
    return;
  }

  // 2. جدولة إشعار يومي
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ وقت العادات!",
      body: "لا تنسَ إنجاز عاداتك اليومية وحفاظك على وسام التميز اليوم! 🔥",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60, // للإختبار السريع (يظهر بعد دقيقة)
      repeats: true,
    },
  });

  console.log("تم جدولة التنبيه اليومي بنجاح!");
}
