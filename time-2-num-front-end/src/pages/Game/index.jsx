import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import EnterNumber from "../../components/EnterNumber";
import RememberNumber from "../../components/RememberNumber";
import LostGame from "../../components/LostGame";
import useGameLogic from "../../hooks/useGameLogic";
import styles from "./Game.module.css";

const Game = () => {
  const navigate = useNavigate();
  const {
    targetNumber,
    level,
    isGuessTime,
    isLostGame,
    error,
    isLoading,
    timerSeconds,
    submitNumber,
    restartGame,
  } = useGameLogic(10, navigate);

  return (
    <div className={styles.customContainer}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {error && (
            <Alert variant="danger" className={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}
          {!isGuessTime && !isLostGame && (
            <RememberNumber
              targetNumber={targetNumber}
              remainingTimerSeconds={timerSeconds}
            />
          )}
          {isGuessTime && !isLostGame && (
            <EnterNumber onNumberSubmit={submitNumber} />
          )}
          {isLostGame && !error && (
            <LostGame levelReached={level} resetGame={restartGame} />
          )}
        </>
      )}
    </div>
  );
};

export default Game;
