import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { colors, fonts, textSizes } from "../constants/constants";
import NumberInput from "../components/NumberInput";
import Button from "../components/Button";

const EnterNumberScreen = ({ targetNumber, onNumberSubmit }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  return (
    <>
      <Text style={styles.instruction}>
        Please enter the number you remembered below:
      </Text>
      <NumberInput
        marginBottom={20}
        width="100%"
        value={enteredNumber}
        onChangeText={setEnteredNumber}
      />
      <Button
        text="Submit"
        onPress={() => onNumberSubmit(enteredNumber)}
        backgroundColor={colors.primary}
      />
    </>
  );
};

const styles = StyleSheet.create({
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

export default EnterNumberScreen;
