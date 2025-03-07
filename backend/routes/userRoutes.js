// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { loginController, registerController, validateToken, createClass, getClassById ,getClasses,} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const userModel = require("../models/userModels");

// Public Routes
router.post("/register", registerController); // Teacher registration
router.post("/login", loginController); // Teacher login

// Protected Routes (Require Authentication)
router.get("/validate-token", authMiddleware, validateToken);
router.post("/create-class", authMiddleware, createClass); // Route for creating a class
router.get("/classes/:id", authMiddleware, getClassById); // Route for fetching class details by ID
router.get("/classes", authMiddleware, getClasses); // Add this route

// Get current user's details
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data", success: false });
  }
});

module.exports = router;