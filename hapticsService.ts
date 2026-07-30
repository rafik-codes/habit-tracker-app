import * as Haptics from "expo-haptics";

// اهتزاز خفيف عند الضغط العادي أو التنقل
export function triggerLightImpact() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

// اهتزاز قوي ومبهج عند إتمام العادة بنجاح (نجاح المهمة)
export function triggerSuccessNotification() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

// اهتزاز تنبيهي عند حدوث خطأ أو حذف عنصر
export function triggerErrorNotification() {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}
