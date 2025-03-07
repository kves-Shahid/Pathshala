// backend/routes/materialRoutes.js
const express = require("express");
const router = express.Router();
const { createMaterial, getMaterials } = require("../controllers/materialController");
const upload = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a new material (announcement, assignment, quiz, or material)
router.post(
  "/create",
  authMiddleware,
  upload.array("files", 5), // Allow up to 5 files
  createMaterial
);

// Fetch materials for a specific class
router.get("/:classId", authMiddleware, getMaterials);

module.exports = router;