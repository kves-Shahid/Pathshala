const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  story: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", storySchema);