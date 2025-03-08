const mongoose = require("mongoose");

const pressSchema = new mongoose.Schema({
  email: { type: String, required: true },
  type: { type: String, enum: ["news", "interview", "press_contact"], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PressRequest = mongoose.model("PressRequest", pressSchema);

module.exports = PressRequest;