import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, fonts, textSizes } from "../constants/constants";

const NumberInput = ({ marginBottom, width, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(value === "");
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[
        styles.container,
        { width, marginBottom },
        (isFocused || !isEmpty) && styles.focused,
      ]}
    >
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        textAlign="center"
        value={value}
        onChangeText={(text) => onChangeText(text)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: 20,
    backgroundColor: "white",
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
    paddingVertical: 12,
    paddingHorizontal: 25,
    textAlign: "center",
  },
  focused: {
    borderColor: colors.primary,
  },
});

export default NumberInput;
