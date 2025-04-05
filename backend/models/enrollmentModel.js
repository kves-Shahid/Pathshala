const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "learners",
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classCodes",
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);