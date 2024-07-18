import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts, textSizes } from "../constants/constants";
import Button from "../components/Button";

const LostGameScreen = ({ levelReached, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.header, { marginBottom: 5 }]}>
        Oops! Looks like you lost.
      </Text>
      <Text style={styles.instruction}>
        You were on Level {levelReached}, but don't worry, you can try again!
      </Text>
      <Button text="Try Again" onPress={onRetry} backgroundColor={colors.primary}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
  },
  header: {
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    color: colors.darkGray,
  },
  instruction: {
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
    color: colors.gray,
    textAlign: "center",
    marginBottom: 15,
  },
});

export default LostGameScreen;
