import { useState, useEffect } from "react";

import { Alert, Spinner } from "react-bootstrap";

import LeaderboardItem from "../../components/LeaderboardItem";

import { fetchLeaderboard } from "../../services/leaderboard.service";

import styles from "./Leaderboard.module.css";
import { handleError } from "../../api/error";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    handleError(error, navigate);
  }, [error]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
          {error ? (
            <Alert variant="danger" className={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
            </Alert>
          ) : (
            <>
              {leaderboard.length > 0 ? (
                <h2 className="mb-4">Leaderboard</h2>
              ) : (
                <h4>No Scores Yet.</h4>
              )}
              {leaderboard.length > 0 && (
                <div className={styles.leaderboardContainer}>
                  {leaderboard.map((entry, index) => (
                    <LeaderboardItem
                      key={index}
                      username={entry.username}
                      levelReached={entry.levelReached}
                      userRank={index + 1}
                    />
                  ))}
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
