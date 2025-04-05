const express = require("express");
const router = express.Router();
const { loginController, registerController, validateToken, createClass, getClassById, getClasses } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const userModel = require("../models/userModels");


router.post("/register", registerController); 
router.post("/login", loginController); 

router.get("/validate-token", authMiddleware, validateToken);
router.post("/create-class", authMiddleware, createClass); 
router.get("/classes/:id", authMiddleware, getClassById); 
router.get("/classes", authMiddleware, getClasses); 

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id); 
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