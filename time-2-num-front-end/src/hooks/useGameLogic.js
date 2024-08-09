import { useState, useEffect } from "react";
import useTimer from "./useTimer";
import { handleError } from "../api/error";
import { generateNumber } from "../utils/helpers";
import { saveResult } from "../services/leaderboard.service";
import { NUMBERS_RANGE } from "../constants";

const useGameLogic = (initialTimerSeconds, navigate) => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [numberLength, setNumberLength] = useState(2);
  const [level, setLevel] = useState(1);
  const [isGuessTime, setIsGuessTime] = useState(false);
  const [isLostGame, setIsLostGame] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [timerSeconds, resetTimer] = useTimer(
    initialTimerSeconds,
    () => {
      setIsGuessTime(true);
    }
  );

  useEffect(() => {
    if (!isGuessTime) {
      setTargetNumber(generateNumber(numberLength - 2));
    }
  }, [isGuessTime, numberLength]);

  useEffect(() => {
    handleError(error, navigate);
  }, [error, navigate]);

  const submitNumber = (text) => {
    const number = parseFloat(text);
    if (
      !isNaN(number) &&
      number !== "" &&
      number === targetNumber
    ) {
      nextLevel();
    } else {
      gameOver();
    }
  };

  const gameOver = async () => {
    try {
      setIsLostGame(true);
      setIsLoading(true);
      await saveResult(level);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setNumberLength(prev =>
      Math.min(prev + 1, NUMBERS_RANGE.length + 1)
    );
    resetTimer();
    setIsGuessTime(false);
  };

  const restartGame = () => {
    setTargetNumber(null);
    setNumberLength(2);
    setLevel(1);
    setIsGuessTime(false);
    setIsLostGame(false);
    resetTimer();
  };

  return {
    targetNumber,
    level,
    isGuessTime,
    isLostGame,
    error,
    isLoading,
    timerSeconds,
    submitNumber,
    restartGame,
  };
};

export default useGameLogic;
