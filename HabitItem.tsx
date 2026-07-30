import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export function HabitItem({ habit, isCompleted, onToggle, onDelete }: any) {
  return (
    <View style={styles.item}>
      {/* علامة الصح (تتغير بناءً على حالة الإنجاز) */}
      <TouchableOpacity onPress={onToggle}>
        <Feather
          name={isCompleted ? "check-circle" : "circle"}
          size={24}
          color={isCompleted ? "#4CAF50" : "#ccc"}
        />
      </TouchableOpacity>

      {/* نص العادة والتاريخ */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, isCompleted && styles.completedText]}>
          {habit.name}
        </Text>
        <Text style={styles.date}>اليوم</Text>
      </View>

      {/* زر الحذف */}
      <TouchableOpacity onPress={onDelete}>
        <Feather name="trash-2" size={20} color="#ff5252" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  textContainer: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16 },
  completedText: { textDecorationLine: "line-through", color: "#999" },
  date: { fontSize: 12, color: "#888", marginTop: 4 },
});
