import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useHabits } from "../contexts/HabitsContext";

import { useColorScheme } from "react-native";
import { Colors } from "../constants/colors";

// داخل دالة الشاشة:
const colorScheme = useColorScheme() ?? "light";

const theme = Colors[colorScheme as "light" | "dark"] || Colors.light;

export default function StatsScreen() {
  const { habits } = useHabits();

  // حساب إحصائيات بسيطة بناءً على العادات الحالية
  const totalHabits = habits.length;
  const maxStreak = habits.reduce(
    (max: number, habit: any) => Math.max(max, habit.streak || 0),
    0,
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>إحصائيات الإنجاز 📊</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>أطول سلسلة التزام (Streak)</Text>
        <Text style={styles.cardValue}>🔥 {maxStreak} أيام</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>إجمالي العادات النشطة</Text>
        <Text style={styles.cardValue}>{totalHabits} عادات</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, color: "#666", textAlign: "right" },
  cardValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4f46e5",
    textAlign: "right",
    marginTop: 5,
  },
});
