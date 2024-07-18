import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { colors, fonts, textSizes } from "../constants/constants";
import * as Progress from "react-native-progress";

const CountdownProgressBar = ({ seconds, width }) => {
  const [timerSeconds, setTimerSeconds] = useState(seconds);

  useEffect(() => {
    if (timerSeconds > 0) {
      const intervalId = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timerSeconds]);

  return <Progress.Bar progress={timerSeconds / 10} width={width} />;
};

const styles = StyleSheet.create({
  timerText: {
    color: colors.primary,
    textAlign: "center",
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
  },
});

export default CountdownProgressBar;
