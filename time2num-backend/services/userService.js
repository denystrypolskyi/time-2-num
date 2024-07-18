const validator = require("validator");
const userRepository = require("../repositories/userRepository");
const leaderboardRepository = require("../repositories/leaderboardRepository");
const jwt = require("jsonwebtoken");
const path = require("path");

const generateToken = (userId, username) => {
  const payload = { userId, username };

  const token = jwt.sign(payload, process.env.MY_SECRET, { expiresIn: "24h" });

  return token;
};

const getUserInfo = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    return { status: 404, data: { message: "User not found!" } };
  }
  return { status: 200, data: user };
};

const updateUserInfo = async (userId, username) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    return { status: 404, message: "User not found!" };
  }

  if (username) {
    const existingUsernameUser = await userRepository.findByUsername(username);
    if (
      existingUsernameUser &&
      existingUsernameUser._id.toString() !== userId
    ) {
      return {
        status: 400,
        message: "Username already exists for another user!",
      };
    }
    const leaderboardEntry = await leaderboardRepository.findByUsername(
      user.username
    );
    if (leaderboardEntry) {
      leaderboardEntry.username = username;
      await leaderboardEntry.save();
    }
    user.username = username;
  }

  await user.save();

  const token = generateToken(userId, user.username);
  return {
    status: 200,
    message: "Your information has been updated successfully!",
    token,
  };
};

const getUserAvatar = async (userId = null, username = null) => {
  let user;

  if (username) {
    user = await userRepository.findByUsername(username);
  } else if (userId) {
    user = await userRepository.findById(userId);
  }

  if (!user || !user.avatarURL) {
    return { status: 404, data: { message: "Avatar not found!" } };
  }

  const avatarURL = user.avatarURL;
  return { status: 200, data: { avatarURL } };
};

const updateUserAvatar = async (userId, avatarURL) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    return { status: 404, message: "User not found!" };
  }

  if (!avatarURL) {
    return { status: 400, message: "Avatar URL is missing!" };
  }

  user.avatarURL = avatarURL;
  await user.save();
  return { status: 200, message: "User avatar updated successfully!" };
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  getUserAvatar,
  updateUserAvatar,
};
