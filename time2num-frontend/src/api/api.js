import axios from "axios";
import {
  API_ENDPOINTS,
} from "../constants/constants";

export const login = async (username, password) => {
  username = username.trim();
  password = password.trim();

  if (!username || !password) {
    throw new Error("Please fill in all fields.");
  }

  try {
    const response = await axios.post(`${API_ENDPOINTS.LOGIN}`, {
      username,
      password,
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export const signUp = async (username, password, avatarURL) => {
  username = username.trim();
  password = password.trim();


  if (!username || !password) {
    throw new Error("Please fill in all fields.");
  }

  try {
    const data = { username, password };

    if (avatarURL) {
      data.avatarURL = avatarURL;
    }

    const response = await axios.post(API_ENDPOINTS.REGISTER, data);

    if (response.status === 200) {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while processing the request."
    );
  }
};

export const checkAuthentication = async () => {
  try {
    const token = localStorage.getItem("token");
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
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Your session has expired. Please log in again.");
    } else {
      throw new Error(error);
    }
  }
};

export const fetchLeaderboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await axios.get(`${API_ENDPOINTS.LEADERBOARD}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const leaderboardData = response.data;

    leaderboardData.sort((a, b) => b.levelReached - a.levelReached);

    return leaderboardData;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Your session has expired. Please log in again.");
    } else {
      throw new Error(error);
    }
  }
};

export const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await axios.get(`${API_ENDPOINTS.USER_INFO}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Failed to fetch user information.");
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Your session has expired. Please log in again.");
    } else {
      throw new Error(error);
    }
  }
};

export const updateUserInfo = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await axios.put(`${API_ENDPOINTS.USER_INFO}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Your session has expired. Please log in again.");
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

export const saveUserResult = async (levelReached) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
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
      throw new Error("Failed to save user result.");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error);
    }
  }
};

export const fetchUserAvatarById = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await axios.get(`${API_ENDPOINTS.USER_AVATAR}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.avatarURL;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message || error.message);
    }
  }
};

export const fetchUserAvatarByUsername = async (username) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await axios.get(`${API_ENDPOINTS.USER_AVATAR}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        username,
      },
    });

    return response.data.avatarURL;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message || error.message);
    }
  }
};

export const updateUserAvatar = async (avatarURL) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await axios.put(
      `${API_ENDPOINTS.USER_AVATAR}`,
      { avatarURL },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error("Failed to update user avatar.");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message || error.message);
    }
  }
};
