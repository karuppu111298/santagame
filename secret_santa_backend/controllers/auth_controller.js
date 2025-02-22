// controllers/authController.js
const authService = require('../services/auth_service');
const User = require('../models/user_model');

const login = async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user_check = await User.findOne({ email: req.body.user_name });
    if (!user_check){ 
        return res.status(200).json({ status: false, message: 'User not found' });
    }
    const isMatch = await user_check.comparePassword(password);
    if (!isMatch) {
      return res.status(200).json({ status: false, message: 'Invalid credentials'});
    }
    const { access_token, refresh_token, user } = await authService.loginUser(user_name, password);
    
    res.status(200).json({success:true, access_token, refresh_token, user});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Register = async (req, res) => {
  try {
    const existsUser = await User.findOne({ email: req.body.email });
    if (existsUser) {
      return res.status(200).json({ status: false, message: 'User already exists' });
    }
    const user = await authService.Register(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const refreshToken = async (req, res) => {
  const { cleanRefreshToken } = req.body;
  console.log(cleanRefreshToken);
  const decoded = authService.validateRefreshToken(cleanRefreshToken);
  if (!decoded) return res.status(403).json({success:false, message: 'Invalid refresh token' });

  const newAccessToken = authService.generateAccessToken(decoded.userId);
  res.status(200).json({success:true, access_token: newAccessToken });
};

module.exports = {
  login,
  Register,
  refreshToken
};
