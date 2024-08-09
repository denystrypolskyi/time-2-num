import axiosInstance from "../api/interceptors/axiosInstance";

export const fetchLeaderboard = async () => {
  try {
    const response = await axiosInstance.get("/leaderboard");

    const leaderboard = response.data;

    leaderboard.sort((a, b) => b.levelReached - a.levelReached);

    return leaderboard;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const saveResult = async (level) => {
  try {
    const response = await axiosInstance.post("/leaderboard", {
      levelReached: level,
    });

    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

18020;
