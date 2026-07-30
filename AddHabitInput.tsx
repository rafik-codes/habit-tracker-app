import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export function AddHabitInput({ onAdd }: any) {
  const [text, setText] = useState("");

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Add a new habit..."
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (text.trim()) {
            onAdd(text);
            setText("");
          }
        }}
      >
        <Text style={styles.buttonText}>إضافة</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#fff",
    width: "60%", // العرض 60% كما طلبت
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 35,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    height: 35,
    justifyContent: "center",
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});
