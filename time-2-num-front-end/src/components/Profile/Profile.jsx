import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Image,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { PencilSquare, PersonFill } from "react-bootstrap-icons";
import {
  fetchUserInfo,
  fetchUserAvatarById,
  updateUserInfo,
  updateUserAvatar,
} from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./Profile.module.css";

const Profile = ({ onLogout }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState({});
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, avatarURL] = await Promise.all([
          fetchUserInfo(),
          fetchUserAvatarById(),
        ]);
        const downloadURL = await getDownloadURL(ref(storage, avatarURL));
        setUserInfo(userData);
        setAvatar(downloadURL);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imageRef = ref(storage, `images/default_avatar`);

    try {
      setIsLoading(true);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      updateUserAvatar(url)
        .then((message) => {
          setAvatar(url);
          setError("");
          setSuccessMessage(message);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChanges = () => {
    setIsLoading(true);
    updateUserInfo(userInfo)
      .then((response) => {
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        setError("");
        setSuccessMessage(response.data.message);
        setIsUsernameDisabled(true);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleError = (error) => {
    if (
      error.message === "Error: Token not found. Please log in." ||
      error.message === "Your session has expired. Please log in again."
    ) {
      onLogout();
      navigate("/login");
    } else {
      let status = error.message.split(" ");
      status = parseInt(status[status.length - 1]);
      setSuccessMessage("");
      setError({ status, message: error.message });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
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
          {error.message && (
            <Alert variant="danger" className={styles.alert}>
              <Alert.Heading>Error</Alert.Heading>
              <p>{error.message}</p>
            </Alert>
          )}
          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage("")}
              dismissible
              className={styles.alert}
            >
              <Alert.Heading>Success</Alert.Heading>
              <p>{successMessage}</p>
            </Alert>
          )}
          {error.status !== 500 && (
            <>
              <h2 className="mb-4">Profile</h2>
              <div className={`mb-4 ${styles.profileContainer}`}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className={styles.hiddenInput}
                  onChange={handleFileChange}
                />
                <Image
                  className={`mb-4 ${styles.image}`}
                  src={avatar}
                  roundedCircle
                  onClick={handleAvatarClick}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.filter = "brightness(70%)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.filter = "brightness(100%)")
                  }
                />
                <InputGroup className="mb-4">
                  <InputGroup.Text>
                    <PersonFill size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    style={{ fontWeight: 500 }}
                    type="text"
                    value={userInfo.username}
                    disabled={isUsernameDisabled}
                    onChange={(e) =>
                      setUserInfo((previousValue) => ({
                        ...previousValue,
                        username: e.target.value,
                      }))
                    }
                  />
                  <InputGroup.Text
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsUsernameDisabled((previousValue) => !previousValue);
                    }}
                  >
                    <PencilSquare size={16} />
                  </InputGroup.Text>
                </InputGroup>
                <Button
                  style={{ fontWeight: 500, width: "100%" }}
                  onClick={saveChanges}
                  variant="success"
                >
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
