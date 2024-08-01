const User = require("../models/user");

const findByUsername = async (username) => {
  return User.findOne({ username });
};

const findById = async (userId) => {
  return User.findById(userId);
};

const create = async (userData) => {
  return User.create(userData);
};

module.exports = {
  findByUsername,
  findById,
  create,
};
