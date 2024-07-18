import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_ENDPOINTS } from "../constants/constants";
import { Alert } from "react-native";

export const checkAuthentication = async (setIsLogged) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        `${API_ENDPOINTS.VERIFY_TOKEN}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLogged(true);
        return;
      } else {
        Alert.alert("Authentication failed:", response.data.message);
        await AsyncStorage.removeItem("token");
        setIsLogged(false);
        return;
      }
    } else {
      setIsLogged(false);
      return;
    }
  } catch (error) {
    Alert.alert("Error", error.response.data.message);
    setIsLogged(false);
  }
};

export const logout = async (setIsLogged) => {
  try {
    await AsyncStorage.removeItem("token");
    setIsLogged(false);
    Alert.alert("Logged Out", "You have been successfully logged out.");
    return;
  } catch (error) {
    Alert.alert("Error", "Failed to log out. Please try again later.");
    return;
  }
};

export const login = async (username, password, setIsLogged) => {
  if (!username.trim() || !password.trim()) {
    Alert.alert("Please provide both username and password.");
    setIsLogged(false);
    return;
  }

  try {
    const response = await axios.post(`${API_ENDPOINTS.LOGIN}`, {
      username,
      password,
    });

    if (response.status === 200) {
      const token = response.data.token;
      console.debug(`Token: ${token}`);
      await AsyncStorage.setItem("token", token);
      setIsLogged(true);
      return;
    } else {
      Alert.alert("Login failed:", response.data.message);
      setIsLogged(false);
      return;
    }
  } catch (error) {
    Alert.alert(
      "Error",
      error.response ? error.response.data.message : error.message
    );
    setIsLogged(false);
    return;
  }
};

export const signUp = async (email, username, password) => {
  email = email.trim();
  username = username.trim();
  password = password.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !username || !password) {
    Alert.alert("Please fill in all fields.");
    return false;
  }

  if (!emailRegex.test(email)) {
    Alert.alert("Please enter a valid email address.");
    return false;
  }

  try {
    const response = await axios.post(`${API_ENDPOINTS.REGISTER}`, {
      email,
      username,
      password,
    });

    if (response.status === 200) {
      Alert.alert("User registered successfully");
      return true;
    } else {
      Alert.alert("Registration failed:", response.data.message);
      return false;
    }
  } catch (error) {
    Alert.alert(
      "Error",
      error.response ? error.response.data.message : error.message
    );
    return false;
  }
};

export const fetchLeaderboardData = async (setIsLogged, setUserResults) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    }

    const response = await axios.get(`${API_ENDPOINTS.LEADERBOARD}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      Alert.alert("No Data", "No leaderboard data available.");
      return;
    }

    const leaderboardData = response.data;

    leaderboardData.sort((a, b) => b.maxLevel - a.maxLevel);

    setUserResults(leaderboardData);
    return;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Alert.alert(
        "Token Expired",
        "Your session has expired. Please log in again."
      );
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    } else {
      Alert.alert(
        "Error",
        error.response ? error.response.data.message : error.message
      );
      return;
    }
  }
};

export const saveUserResult = async (levelReached, setIsLogged) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    }

    const response = await axios.post(
      `${API_ENDPOINTS.SAVE_RESULT}`,
      { levelReached },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.debug(response.data.message);
      return;
    } else {
      Alert.alert("Error", "Failed to save user result.");
      return;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Alert.alert("Error", error.response.data.message);
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    } else {
      Alert.alert(
        "Error",
        error.response ? error.response.data.message : error.message
      );
      return;
    }
  }
};

export const fetchUserInfo = async (setIsLogged) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    }

    const response = await axios.get(`${API_ENDPOINTS.USER_INFO}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      Alert.alert("Failed to fetch user information");
      return;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Alert.alert(
        "Token Expired",
        "Your session has expired. Please log in again."
      );
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    } else {
      Alert.alert(
        "Error",
        error.response ? error.response.data.message : error.message
      );
      return;
    }
  }
};

export const updateUserInfo = async (userData) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    }

    const response = await axios.put(`${API_ENDPOINTS.USER_INFO}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      Alert.alert("Success", response.data.message)
      return response;
    } else {
      Alert.alert(response.data.message);
      return;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("token");
      Alert.alert("Your session has expired. Please log in again.");
      return;
    } else {
      Alert.alert(error.response.data.message);
      return;
    }
  }
};

export const fetchUserAvatar = async (setIsLogged) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    }

    const response = await axios.get(`${API_ENDPOINTS.USER_AVATAR}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const avatarPathSegments = response.data.avatarPath.split("\\");
    const fileName = avatarPathSegments[avatarPathSegments.length - 1];
    return fileName;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Alert.alert("Error", error.response.data.message);
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    } else {
      Alert.alert(
        "Error",
        error.response ? error.response.data.message : error.message
      );
      return;
    }
  }
};

export const updateUserAvatar = async (setIsLogged, fileUri) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    }

    // const formData = new FormData();
    // formData.append("avatar", {
    //   uri: fileUri,
    //   type: "image/jpeg",
    //   name: "avatar.jpg",
    // });

    // const response = await axios.put(`${API_ENDPOINTS.USER_AVATAR}`, formData, {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // if (response.status === 200) {
    //   Alert.alert("Success", "Avatar uploaded successfully");
    // } else {
    //   console.error("Failed to upload avatar");
    // }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Alert.alert("Error", error.response.data.message);
      await AsyncStorage.removeItem("token");
      setIsLogged(false);
      return;
    } else {
      Alert.alert(
        "Error",
        error.response ? error.response.data.message : error.message
      );
      return;
    }
  }
};
