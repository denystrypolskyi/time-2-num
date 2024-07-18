import { useEffect, useState } from "react";
import { NUMBERS_RANGE } from "../../constants/constants";
import { Alert, Spinner } from "react-bootstrap";
import { generateNumber } from "../../utils/helpers";
import EnterNumber from "../EnterNumber/EnterNumber";
import RememberNumber from "../RememberNumber/RememberNumber";
import LostGame from "../LostGame/LostGame";
import { saveUserResult } from "../../api/api";
import { useNavigate } from "react-router-dom";
import styles from "./Game.module.css";

const useTimer = (initialSeconds, callback) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (remainingSeconds === 0) {
      callback();
    } else {
      const intervalId = setInterval(() => {
        setRemainingSeconds((previousValue) => previousValue - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [remainingSeconds]);

  const resetTimer = () => {
    setRemainingSeconds(initialSeconds);
  };

  return [remainingSeconds, resetTimer];
};

const Game = ({ onLogout }) => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [currentNumberLength, setCurrentNumberLength] = useState(2);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isGuessTime, setIsGuessTime] = useState(false);
  const [hasLostGame, setHasLostGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialTimerSeconds = 10;

  const navigate = useNavigate();

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

  const handleIncorrectAnswerAndSaveResult = async () => {
    setHasLostGame(true);
    setIsLoading(true);
    try {
      await saveUserResult(currentLevel);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const moveToNextLevel = () => {
    setCurrentLevel((previousValue) => previousValue + 1);
    setCurrentNumberLength((prev) =>
      Math.min(prev + 1, NUMBERS_RANGE.length + 1)
    );
    resetTimer();
    setIsGuessTime(false);
  };

  const resetGame = () => {
    setTargetNumber(null);
    setCurrentNumberLength(2);
    setCurrentLevel(1);
    setIsGuessTime(false);
    setHasLostGame(false);
    resetTimer();
  };

  const handleError = (error) => {
    if (
      error.message === "Error: Token not found. Please log in." ||
      error.message === "Your session has expired. Please log in again."
    ) {
      onLogout();
      navigate("/login");
    } else {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.customContainer}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {errorMessage && (
            <Alert variant="danger" className={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
          )}
          {!isGuessTime && !hasLostGame && (
            <RememberNumber
              targetNumber={targetNumber}
              remainingTimerSeconds={remainingTimerSeconds}
            />
          )}
          {isGuessTime && !hasLostGame && (
            <EnterNumber onNumberSubmit={handleNumberSubmission} />
          )}
          {hasLostGame && !errorMessage && (
            <LostGame levelReached={currentLevel} resetGame={resetGame} />
          )}
        </>
      )}
    </div>
  );
};

export default Game;
