import { useState, useEffect } from "react";

import { InputGroup, Form, Button, Spinner } from "react-bootstrap";
import { PersonFill, PencilSquare } from "react-bootstrap-icons";

import { updateUser, fetchUser } from "../../services/user.service.js";

import styles from "./UserInfo.module.css";

const UserInfo = ({ setError, setSuccessMessage }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUser();
        setUserInfo(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setError]);

  const saveChanges = async () => {
    try {
      setIsLoading(true);
      const response = await updateUser(userInfo);
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setSuccessMessage(response.data.message);
      setIsUsernameDisabled(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <InputGroup className="mb-4">
        <InputGroup.Text>
          <PersonFill size={16} />
        </InputGroup.Text>
        <Form.Control
          style={{ fontWeight: 500 }}
          type="text"
          value={userInfo.username || ""}
          disabled={isUsernameDisabled}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <InputGroup.Text
          style={{ cursor: "pointer" }}
          onClick={() => setIsUsernameDisabled(!isUsernameDisabled)}
        >
          <PencilSquare size={16} />
        </InputGroup.Text>
      </InputGroup>
      <Button
        style={{ width: "100%" }}
        onClick={saveChanges}
        variant="success"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default UserInfo;
