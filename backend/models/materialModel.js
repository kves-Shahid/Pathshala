const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  type: { type: String, required: true }, 
});

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  files: [fileSchema],
  type: { type: String, required: true }, 
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "classCodes", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Material", materialSchema);