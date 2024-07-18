import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts, textSizes } from "../constants/constants";

const EditableInput = ({ value, setValue, iconName }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditIconPress = () => {
    setIsEditing(!isEditing);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isEditing ? "#F0F0F0" : "#E9ECEF", borderColor: isEditing ? "#DDD" : "#E9ECEF" },
      ]}
      onPress={() => setIsEditing(true)}
    >
      <Ionicons name={iconName} size={24} color={isEditing ? "#999" : "black"} style={styles.icon} />
      {isEditing ? (
        <TextInput
          style={[styles.input, { color: "#333", borderBottomWidth: 1, borderColor: "#CCC" }]}
          value={value}
          onChangeText={(text) => setValue(text)}
          autoFocus
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <Text style={styles.input}>{value}</Text>
      )}
      {!isEditing && (
        <Ionicons
          name={"create-outline"}
          size={24}
          color="black"
          style={styles.icon}
          onPress={handleEditIconPress}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  icon: {
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
  },
});

export default EditableInput;
