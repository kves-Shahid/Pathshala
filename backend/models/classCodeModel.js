const mongoose = require("mongoose");

const classCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  section: {
    type: String,
  },
  subject: {
    type: String,
  },
  room: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
  },
});

const ClassCodeModel = mongoose.model("classCodes", classCodeSchema);

module.exports = ClassCodeModel;