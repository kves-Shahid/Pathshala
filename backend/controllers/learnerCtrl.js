const learnerModel = require("../models/learnerModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = require("../middlewares/emailValidator");

// Learner Signup Controller
const registerLearner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Email
    const emailValidation = await validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({ message: emailValidation.message, success: false });
    }

    // Check if learner already exists
    const existingLearner = await learnerModel.findOne({ email });
    if (existingLearner) {
      return res.status(400).json({ message: "Learner Already Exists", success: false });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    // Save new learner
    const newLearner = new learnerModel(req.body);
    await newLearner.save();

    res.status(201).json({ message: "Learner Registered Successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Error in Register Learner: ${error.message}` });
  }
};

// Learner Login Controller
const loginLearner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Email
    const emailValidation = await validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({ message: emailValidation.message, success: false });
    }

    // Check if learner exists
    const learner = await learnerModel.findOne({ email });
    if (!learner) {
      return res.status(400).json({ message: "Learner Not Found", success: false });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, learner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ id: learner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ 
      message: "Login Success", 
      success: true, 
      token, 
      role: "learner" // Add role to the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error in Learner Login: ${error.message}`, success: false });
  }
};

// Token Validation Controller
const validateToken = async (req, res) => {
  try {
    // If the request reaches here, the token is already validated by the authMiddleware
    res.status(200).json({ 
      message: "Token is valid", 
      success: true 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error validating token", success: false });
  }
};

module.exports = { registerLearner, loginLearner, validateToken };