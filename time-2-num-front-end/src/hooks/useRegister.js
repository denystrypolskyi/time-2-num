import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useFileUpload from "./useFileUpload.js";

import { login as signIn, register } from "../services/auth.service.js";

import { useAuth } from "../contexts/AuthContext.jsx";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { login } = useAuth();

  const { uploadFile } = useFileUpload();

  let navigate = useNavigate();

  const handleRegister = async (username, password, avatar) => {
    let avatarURL = null;
    setIsLoading(true);

    if (avatar) {
      try {
        avatarURL = await uploadFile(avatar);
      } catch (error) {
        setErrorMessage("Failed to upload avatar. Please try again.");
        setIsLoading(false);
        return;
      }
    }

    try {
      await register(username, password, avatarURL);
      const response = await signIn(username, password); 
      login(response.data.token);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    handleRegister,
  };
};

export default useRegister;
