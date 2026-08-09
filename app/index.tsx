import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useHabits } from "../HabitsContext";
import { HabitItem } from "../HabitItem";
import { AddHabitInput } from "../AddHabitInput";
import { Colors } from "../colors";

export default function HomeScreen() {
  const { habits, addHabit, deleteHabit, toggleHabitCompletion } =
    useHabits();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme as "light" | "dark"] || Colors.light;

  const today = new Date().toISOString().split("T")[0];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        عاداتي اليومية ✅
      </Text>

      <AddHabitInput onAdd={addHabit} />

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.icon }]}>
            ما عندك أي عادة بعد — أضف وحدة جديدة! 🌱
          </Text>
        }
        renderItem={({ item }) => (
          <HabitItem
            habit={item}
            isCompleted={item.lastCompletedDate === today}
            onToggle={() => toggleHabitCompletion(item.id)}
            onDelete={() => deleteHabit(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
  },
  list: { paddingBottom: 40 },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
  },
});
