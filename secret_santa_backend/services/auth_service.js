// services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const config = require('../config/config');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiration,
  });
};

const validateRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  
  const access_token = generateAccessToken(user._id);
  const refresh_token = generateRefreshToken(user._id);

  return { access_token, refresh_token, user };
};


const Register = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  loginUser,
  Register
};
