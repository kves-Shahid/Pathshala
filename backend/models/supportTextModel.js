const mongoose = require("mongoose");

const supportTextSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a text index on the title and content fields
supportTextSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("SupportText", supportTextSchema);