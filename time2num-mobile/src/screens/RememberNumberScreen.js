import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CountdownProgressBar from "../components/CountdownProgressBar";
import { colors, fonts, textSizes } from "../constants/constants";

const RememberNumberScreen = ({ targetNumber, remainingTimerSeconds }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>
        You have limited time to memorize the number. Pay close attention!
      </Text>
      <Text style={styles.number}>{targetNumber}</Text>

      <CountdownProgressBar seconds={remainingTimerSeconds} width={300} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: fonts.bold,
    fontSize: textSizes.huge,
    color: colors.primary,
  },
  number: {
    fontFamily: fonts.regular,
    fontSize: textSizes.large,
    color: colors.black,
    marginBottom: 10,
  },
  instruction: {
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
    color: colors.gray,
    textAlign: "center",
    marginBottom: 5,
  },
});

export default RememberNumberScreen;
