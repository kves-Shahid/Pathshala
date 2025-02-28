const express = require("express");
const router = express.Router();
const { registerLearner, loginLearner, validateToken } = require("../controllers/learnerCtrl");
const learnerAuthMiddleware = require("../middlewares/learnerAuthMiddleware"); // Import learner-specific middleware

// Public Routes
router.post("/register", registerLearner);
router.post("/login", loginLearner);

// Protected Route (Require Authentication)
router.get("/validate-token", learnerAuthMiddleware, validateToken);

module.exports = router;