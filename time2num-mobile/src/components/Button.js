import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, fonts, textSizes } from "../constants/constants";

const Button = ({ text, onPress, width, backgroundColor,marginBottom}) => {
  return (
    <TouchableOpacity style={[styles.button, {width, backgroundColor, marginBottom}]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
});

export default Button;
