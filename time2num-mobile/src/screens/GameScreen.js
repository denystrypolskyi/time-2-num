import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { saveUserResult } from "../api/api";
import { colors, numbersRange } from "../constants/constants";
import LostGameScreen from "./LostGameScreen";
import { generateNumber } from "../utils/helpers";
import EnterNumberScreen from "./EnterNumberScreen";
import RememberNumberScreen from "./RememberNumberScreen";

const useTimer = (initialSeconds, callback) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (remainingSeconds === 0) {
      callback();
    } else {
      const intervalId = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [remainingSeconds]);

  const resetTimer = () => {
    setRemainingSeconds(initialSeconds);
  };

  return [remainingSeconds, resetTimer];
};

const GameScreen = ({ route }) => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [currentNumberLength, setCurrentNumberLength] = useState(2);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isGuessTime, setIsGuessTime] = useState(false);
  const [hasLostGame, setHasLostGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsLogged } = route.params;
  const initialTimerSeconds = 10;

  const [remainingTimerSeconds, resetTimer] = useTimer(
    initialTimerSeconds,
    () => {
      setIsGuessTime(true);
    }
  );

  useEffect(() => {
    if (!isGuessTime) {
      setTargetNumber(generateNumber(currentNumberLength - 2));
    }
  }, [isGuessTime]);

  const handleNumberSubmission = (enteredText) => {
    const parsedNumber = parseFloat(enteredText);
    if (
      !isNaN(parsedNumber) &&
      parsedNumber !== "" &&
      parsedNumber === targetNumber
    ) {
      moveToNextLevel();
    } else {
      handleIncorrectAnswerAndSaveResult();
    }
  };

  const moveToNextLevel = () => {
    setCurrentLevel((prev) => prev + 1);
    setCurrentNumberLength((prev) =>
      Math.min(prev + 1, numbersRange.length + 1)
    );
    resetTimer();
    setIsGuessTime(false);
  };

  const handleIncorrectAnswerAndSaveResult = async () => {
    setHasLostGame(true);
    setIsLoading(true);
    try {
      await saveUserResult(currentLevel, setIsLogged);
    } catch (error) {
      console.error("Error while saving user result:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setTargetNumber(null);
    setCurrentNumberLength(2);
    setCurrentLevel(1);
    setIsGuessTime(false);
    setHasLostGame(false);
    resetTimer();
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <View style={styles.container}>
      {!isGuessTime && !hasLostGame && (
        <RememberNumberScreen
          targetNumber={targetNumber}
          remainingTimerSeconds={remainingTimerSeconds}
        />
      )}
      {isGuessTime && !hasLostGame && (
        <EnterNumberScreen
          targetNumber={targetNumber}
          onNumberSubmit={handleNumberSubmission}
        />
      )}
      {hasLostGame && (
        <LostGameScreen
          targetNumber={targetNumber}
          levelReached={currentLevel}
          onRetry={resetGame}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bgColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default GameScreen;
