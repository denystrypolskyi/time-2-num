import axiosInstance from "../api/interceptors/axiosInstance";

export const login = async (username, password) => {
  try {
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      throw new Error("Please fill in all fields.");
    }
    const data = { username, password };

    const response = await axiosInstance.post(`/auth/login`, data);

    // localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const register = async (username, password, avatarURL) => {
  try {
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      throw new Error("Please fill in all fields.");
    }

    const data = { username, password };
    
    if (avatarURL) {
      data.avatarURL = avatarURL;
    }
    
    const response = await axiosInstance.post("/auth/register", data);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const checkAuthentication = async () => {
  try {
    const response = await axiosInstance.post("auth/verify-token");
    return response;
  } catch (error) {
    console.error(error)
    // localStorage.removeItem("token");
    throw new Error(error?.response?.data?.message);
  }
};
