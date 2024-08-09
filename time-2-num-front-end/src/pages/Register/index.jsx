import { useState } from "react";
import { Alert, Spinner, Button, Form } from "react-bootstrap";

import useRegister from "../../hooks/useRegister";

import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState(null);

  const { isLoading, errorMessage, handleRegister } = useRegister();

  const handleClick = () => {
    handleRegister(username, password, avatar);
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
          <div className={`mb-4 ${styles.customFormContainer}`}>
            <h1>Create</h1>
            <h1 className="mb-4">Account</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label style={{ fontWeight: 500 }}>Username</Form.Label>
                <Form.Control
                  style={{ fontWeight: 500 }}
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
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
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicProfilePicture">
                <Form.Label style={{ fontWeight: 500 }}>
                  Profile Picture
                </Form.Label>
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
                disabled={isLoading}
                onClick={handleClick}
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
