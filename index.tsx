import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useHabits } from "../hooks/useHabits";
import * as Haptics from "expo-haptics";
import i18n from "./i18n";
import { calculateHabitStats } from "../lib/api-client-react/src/statsService";
import { calculateStreak } from "../lib/api-client-react/src/streakService";
import { scheduleDailyReminder } from "../contexts/notificationService";
export default function App() {
  const [text, setText] = useState("");
  const { habits, addHabit, deleteHabit, toggleHabit } = useHabits();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const filteredHabits = habits.filter((habit) => {
    if (filter === "completed") return habit.isCompleted;
    if (filter === "pending") return !habit.isCompleted;
    return true; // "all" لعرض الكل
  });
  // دالة ذكية لتحليل أداء المستخدم وتقديم نصيحة مخصصة
  const getAIInsights = () => {
    const totalHabits = habits.length;
    if (totalHabits === 0)
      return "💡 أضف عادتك الأولى اليوم واجعل البداية قوية!";

    const completedHabits = habits.filter((h) => h.isCompleted).length;
    const completionRate = (completedHabits / totalHabits) * 100;

    if (completionRate === 100) {
      return "🔥 أداء مذهل! لقد أتممت كل عاداتك اليوم، استمر بهذا النسق الرائع لتصنع نسخة أفضل من نفسك.";
    } else if (completionRate >= 50) {
      return "⚡ أنت تسير بخطى ثابتة ومتاحة! باقي القليل فقط لتنهي كافة عاداتك اليومية بنجاح.";
    } else {
      return "🎯 تذكر أن القليل الدائم خير من الكثير المنقطع. ابدأ بعادة واحدة الآن وحقق إنجازك الأول!";
    }
  };
  const themeColors = {
    background: isDarkMode ? "#121212" : "#f9f9f9",
    cardBackground: isDarkMode ? "#1e1e1e" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#333333",
    subText: isDarkMode ? "#b0b0b0" : "#666666",
    primary: "#1976d2",
  };

  const stats = calculateHabitStats(habits);
  const streakInfo = calculateStreak(habits);
  // أضف حماية Fallback هنا قبل رسم الواجهة
  if (!habits) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>جاري تحميل بيانات العادات...</Text>
      </View>
    );
  }

  const handleToggle = (id: string) => {
    // 1. تشغيل الاهتزاز الناجح عند إتمام العادة
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // 2. تحديث حالة العادة (إنجاز / إلغاء الإنجاز)
    toggleHabit(id);
  };
  return (
    <View style={{ flex: 1, padding: 50 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        {i18n.t("welcome")}
      </Text>
      {/* زر تبديل الثيم */}
      <TouchableOpacity
        onPress={() => setIsDarkMode(!isDarkMode)}
        style={{
          backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
          padding: 10,
          borderRadius: 8,
          alignSelf: "flex-end",
          marginBottom: 15,
        }}
      >
        <Text
          style={{ color: isDarkMode ? "#fff" : "#333", fontWeight: "bold" }}
        >
          {isDarkMode ? "☀️ الوضع الفاتح" : "🌙 الوضع الليلي"}
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder={i18n.t("addHabit")}
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      {/* صندوق التحليل الذكي والتوجيه */}
      <View
        style={{
          backgroundColor: "#e3f2fd",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
          borderLeftWidth: 5,
          borderLeftColor: "#1976d2",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#0d47a1", marginBottom: 5 }}>
          🤖 مساعد الذكاء الاصطناعي لتحليل السلوك:
        </Text>
        <Text style={{ color: "#333", fontSize: 14, lineHeight: 20 }}>
          {getAIInsights()}
        </Text>
      </View>

      <Button
        title={i18n.t("addHabit")}
        onPress={() => {
          addHabit(text);
          setText("");
        }}
      />
      {/* قسم الإحصائيات الذكية */}
      <View
        style={{
          backgroundColor: "#f0f4f8",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          📊 إحصائيات الإنجاز:
        </Text>
        <Text>إجمالي العادات: {stats.totalHabits}</Text>
        <Text>المنجزة: {stats.completedHabits}</Text>
        <Text>نسبة النجاح: {stats.completionRate}%</Text>
      </View>
      {/* قسم التحفيز والأوسمة الذكية */}
      <View
        style={{
          backgroundColor: "#fff8e1",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          ⭐ وسام اليوم: {streakInfo.badge}
        </Text>
        <Text style={{ fontSize: 14, color: "#5d4037", textAlign: "center" }}>
          {streakInfo.streakMessage}
        </Text>
      </View>
      {/* زر تفعيل التنبيهات اليومية */}
      <TouchableOpacity
        style={{
          backgroundColor: "#1976d2",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 15,
        }}
        onPress={scheduleDailyReminder}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
          🔔 تفعيل التنبيهات اليومية
        </Text>
      </TouchableOpacity>
      {/* أزرار تصفية العادات */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 15,
          backgroundColor: "#f0f0f0",
          padding: 8,
          borderRadius: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => setFilter("all")}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: filter === "all" ? "#1976d2" : "transparent",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: filter === "all" ? "#fff" : "#333",
              fontWeight: "bold",
            }}
          >
            الكل
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("pending")}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: filter === "pending" ? "#1976d2" : "transparent",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: filter === "pending" ? "#fff" : "#333",
              fontWeight: "bold",
            }}
          >
            قيد التنفيذ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("completed")}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: filter === "completed" ? "#1976d2" : "transparent",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: filter === "completed" ? "#fff" : "#333",
              fontWeight: "bold",
            }}
          >
            المكتملة
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => toggleHabit(item.id)}>
              <Text style={{ marginRight: 10 }}>
                {item.isCompleted ? "✅" : "⬜"}
              </Text>
            </TouchableOpacity>

            <Text style={{ flex: 1 }}>{item.name}</Text>

            <Button
              title="حذف"
              color="red"
              onPress={() => deleteHabit(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}
