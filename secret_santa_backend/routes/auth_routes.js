// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/auth_controller');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.Register);
router.post('/refresh_token', authController.refreshToken);

module.exports = router;
