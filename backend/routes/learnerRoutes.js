const express = require("express");
const router = express.Router();
const { registerLearner, loginLearner, validateToken } = require("../controllers/learnerCtrl");
const learnerAuthMiddleware = require("../middlewares/learnerAuthMiddleware");
const ClassCodeModel = require("../models/classCodeModel");
const EnrollmentModel = require("../models/enrollmentModel");
const learnerModel = require("../models/learnerModels"); 


router.post("/register", registerLearner);

router.post("/login", loginLearner);

router.get("/validate-token", learnerAuthMiddleware, validateToken);

router.post("/join-class", learnerAuthMiddleware, async (req, res) => {
  try {
    const { code } = req.body;
    const learnerId = req.body.userId;

    const learner = await learnerModel.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ message: "Learner not found", success: false });
    }

    const classDetails = await ClassCodeModel.findOne({ code });
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found", success: false });
    }

  
    const existingEnrollment = await EnrollmentModel.findOne({
      learnerId,
      classId: classDetails._id,
    });
    if (existingEnrollment) {
      return res.status(400).json({ message: "Already enrolled in this class", success: false });
    }

 
    await EnrollmentModel.create({ learnerId, classId: classDetails._id });

    res.status(200).json({ 
      message: "Class joined successfully", 
      success: true, 
      classId: classDetails._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error joining class", success: false });
  }
});


router.get("/enrolled-classes", learnerAuthMiddleware, async (req, res) => {
  try {
    const learnerId = req.body.userId;

    const learner = await learnerModel.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ message: "Learner not found", success: false });
    }

   
    const enrollments = await EnrollmentModel.find({ learnerId }).populate("classId");

    res.status(200).json({ 
      success: true, 
      classes: enrollments.map((e) => e.classId),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching enrolled classes", success: false });
  }
});


router.get("/me", learnerAuthMiddleware, async (req, res) => {
  try {
    const learner = await learnerModel.findById(req.user.id); 
    if (!learner) {
      return res.status(404).json({ message: "Learner not found", success: false });
    }

    res.status(200).json({
      name: learner.name,
      email: learner.email,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching learner data", success: false });
  }
});

module.exports = router;