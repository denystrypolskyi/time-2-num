import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import UserAvatar from "./UserAvatar";
import UserInfo from "./UserInfo";
import styles from "./Profile.module.css";
import { handleError } from "../../api/error";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    handleError(error, navigate);
  }, [error]);

  return (
    <div className={styles.customContainer}>
      {error ? (
        <Alert variant="danger" className={styles.alert}>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      ) : (
        <>
          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage(null)}
              dismissible
              className={styles.alert}
            >
              <Alert.Heading>Success</Alert.Heading>
              <p>{successMessage}</p>
            </Alert>
          )}
          <h2 className="mb-4">Profile</h2>
          <div className={`mb-4 ${styles.profileContainer}`}>
            <UserAvatar
              setError={setError}
              setSuccessMessage={setSuccessMessage}
            />
            <UserInfo
              setError={setError}
              setSuccessMessage={setSuccessMessage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
