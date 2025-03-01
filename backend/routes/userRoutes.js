const express = require('express');
const router = express.Router();
const { loginController, registerController, validateToken } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// Public Routes
router.post('/register', registerController);
router.post('/login', loginController);

// Protected Route (Require Authentication)
router.get('/validate-token', authMiddleware, validateToken);

module.exports = router;