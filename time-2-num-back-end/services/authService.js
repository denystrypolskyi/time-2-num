const bcrypt = require("bcryptjs");
const validator = require("validator");
const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");

const generateToken = (userId, username, avatarURL) => {
  const payload = { userId, username, avatarURL };

  const token = jwt.sign(payload, process.env.MY_SECRET, { expiresIn: "24h" });

  return token;
};

const register = async (username, password, avatarURL) => {
  if (!username || !password) {
    return {
      status: 400,
      message: "Username and password are required!",
    };
  }

  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    return { status: 400, message: "Username already exists!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { username, password: hashedPassword };

  if (avatarURL) {
    userData.avatarURL = avatarURL;
  } else {
    userData.avatarURL = process.env.DEFAULT_AVATAR_URL;
  }

  await userRepository.create(userData);

  return { status: 200, message: "User registered successfully!" };
};

const login = async (username, password) => {
  if (!username || !password) {
    return { status: 400, message: "Username or password is missing!" };
  }

  const user = await userRepository.findByUsername(username);

  if (!user) {
    return { status: 404, message: "User not found!" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { status: 401, message: "Incorrect password!" };
  }

  const token = generateToken(user._id, username, user.avatarURL);
  return { status: 200, token, message: "Login successful!" };
};

module.exports = {
  register,
  login,
};
