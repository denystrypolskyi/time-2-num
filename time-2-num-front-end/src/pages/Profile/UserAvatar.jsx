import { useEffect, useRef, useState } from "react";

import { Image, Spinner } from "react-bootstrap";

import { storage } from "../../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { fetchAvatar, updateAvatar } from "../../services/user.service.js";

import styles from "./UserAvatar.module.css";

const UserAvatar = ({ setError, setSuccessMessage }) => {
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avatarURL = await fetchAvatar();
        const downloadURL = await getDownloadURL(
          ref(storage, avatarURL.data.avatarURL)
        );
        setAvatar(downloadURL);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setError]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageRef = ref(storage, `images/default_avatar`);

    try {
      setIsLoading(true);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      await updateAvatar(url);
      setAvatar(url);
      setSuccessMessage("Avatar updated successfully!");
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className={styles.hiddenInput}
            onChange={handleFileChange}
          />
          <Image
            className={styles.image}
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
        </div>
      )}
    </>
  );
};

export default UserAvatar;
