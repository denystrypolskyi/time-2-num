import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signUp } from "../../api/api.js";
import { storage } from "../../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let avatarURL = null;
    if (avatar) {
      const imageRef = ref(storage, `images/${v4()}`);
      try {
        await uploadBytes(imageRef, avatar);
        avatarURL = await getDownloadURL(imageRef);
      } catch (error) {
        setErrorMessage("Failed to upload avatar. Please try again.");
        setIsLoading(false);
        return;
      }
    }

    signUp(username, password, avatarURL)
      .then((success) => {
        if (success) {
          setShowSuccess(true);
          setErrorMessage("");
          setUsername("");
          setPassword("");
          setAvatar(null);
        } else {
          setErrorMessage("Registration failed. Please try again.");
          setShowSuccess(false);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.customContainer}>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          {errorMessage && (
            <Alert variant="danger" className={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
          )}
          {showSuccess && (
            <Alert
              variant="success"
              onClose={() => setShowSuccess(false)}
              dismissible
              className={styles.alert}
            >
              <Alert.Heading>Success</Alert.Heading>
              <p>Successfully registered user.</p>
            </Alert>
          )}
          <div className={`mb-4 ${styles.customFormContainer}`}>
            <h1>Create</h1>
            <h1 className="mb-4">Account</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label style={{ fontWeight: 500 }}>Username</Form.Label>
                <Form.Control
                  style={{ fontWeight: 500 }}
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{ fontWeight: 500 }}>Password</Form.Label>
                <Form.Control
                  style={{ fontWeight: 500 }}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicProfilePicture">
                <Form.Label style={{ fontWeight: 500 }}>Profile Picture</Form.Label>
                <Form.Control
                  style={{ fontWeight: 500 }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </Form.Group>

              <Button
                style={{ fontWeight: 500 }}
                variant="primary"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
