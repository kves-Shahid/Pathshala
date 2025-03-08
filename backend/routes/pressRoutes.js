const express = require("express");
const pressController = require("../controllers/pressController");

const router = express.Router();

router.post("/press-request", pressController.submitPressRequest);

module.exports = router;