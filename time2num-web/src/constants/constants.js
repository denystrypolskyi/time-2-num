export const NUMBERS_RANGE = [
  { min: 10, max: 99 },
  { min: 100, max: 999 },
  { min: 1000, max: 9999 },
  { min: 10000, max: 99999 },
  { min: 100000, max: 999999 },
  { min: 1000000, max: 9999999 },
  { min: 10000000, max: 99999999 },
  { min: 100000000, max: 999999999 },
  { min: 1000000000, max: 9999999999 },
];

export const COLORS = {
  primary: "#0D6EFD",
  gold: "#FFD700",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
  darkGray: "#444444",
};

export const API_BASE_URL = "https://time-2-num-api.onrender.com";
// export const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  USER_INFO: `${API_BASE_URL}/user/user-info`,
  VERIFY_TOKEN: `${API_BASE_URL}/auth/verify-token`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LEADERBOARD: `${API_BASE_URL}/leaderboard/leaderboard`,
  SAVE_RESULT: `${API_BASE_URL}/leaderboard/save-result`,
  USER_AVATAR: `${API_BASE_URL}/user/user-avatar`,
};