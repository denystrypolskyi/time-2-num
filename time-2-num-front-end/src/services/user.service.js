import axiosInstance from "../api/interceptors/axiosInstance";

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/user");

    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateUser = async (data) => {
  try {
    const response = await axiosInstance.put("/user", data);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const fetchAvatar = async () => {
  try {
    const response = await axiosInstance.get("/user/avatar");
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateAvatar = async (avatarURL) => {
  try {
    const response = await axiosInstance.put("/user/avatar", {
      avatarURL,
    });
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const fetchAvatarByUsername = async (username) => {
  try {
    const response = await axiosInstance.get("/user/avatar", {
      params: {
        username,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
