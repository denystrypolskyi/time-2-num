import { useState } from "react";
import { Alert, Spinner, Button, Form } from "react-bootstrap";
import { login } from "../../api/api";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    login(username, password)
      .then(() => {
        onLogin();
        navigate("/profile");
      })
      .catch((error) => {
        setErrorMessage(error.message);
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
            <Alert className={styles.alert} variant="danger alert">
              <Alert.Heading>Error</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
          )}
          <div className={`mb-4 ${styles.customFormContainer}`}>
            <h1>Welcome</h1>
            <h1 className="mb-4">Back</h1>
            <Form onSubmit={handleSubmit}>
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
              <Button
                style={{ fontWeight: 500 }}
                variant="primary"
                type="submit"
              >
                Sign In
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
