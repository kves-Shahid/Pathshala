const express = require("express");
const router = express.Router();
const { createMaterial, getMaterials } = require("../controllers/materialController");
const upload = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/authMiddleware");


router.post(
  "/create",
  authMiddleware, 
  upload.array("files", 5), 
  createMaterial
);
router.get("/:classId", authMiddleware, getMaterials);

module.exports = router;