import { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import LeaderboardItem from "../LeaderboardItem/LeaderboardItem";
import { fetchLeaderboardData } from "../../api/api";
import { useNavigate } from "react-router-dom";
import styles from "./Leaderboard.module.css";

const Leaderboard = ({ onLogout }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboardData()
      .then((data) => {
        setLeaderboardData(data);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
        <Spinner
          className={styles.spinner}
          animation="border"
          variant="primary"
        />
      ) : (
        <>
          {errorMessage ? (
            <Alert variant="danger" className={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
          ) : (
            <>
              {leaderboardData.length > 0 ? (
                <h2 className="mb-4">Leaderboard</h2>
              ) : (
                <h4>No Scores Yet.</h4>
              )}
              {leaderboardData.length > 0 && (
                <div className={styles.leaderboardContainerBorder}>
                  <div className={styles.leaderboardContainer}>
                    {leaderboardData.map((entry, index) => (
                      <LeaderboardItem
                        key={index}
                        username={entry.username}
                        levelReached={entry.levelReached}
                        userRank={index + 1}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
