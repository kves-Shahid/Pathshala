const learnerModel = require("../models/learnerModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Learner Signup Controller
const registerLearner = async (req, res) => {
  try {
    const existingLearner = await learnerModel.findOne({ email: req.body.email });
    if (existingLearner) {
      return res.status(200).send({ message: "Learner Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newLearner = new learnerModel(req.body);
    await newLearner.save();
    res.status(201).send({ message: "Learner Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Error in Register Learner: ${error.message}` });
  }
};

// Learner Login Controller
const loginLearner = async (req, res) => {
  try {
    const learner = await learnerModel.findOne({ email: req.body.email });
    if (!learner) {
      return res.status(200).send({ message: "Learner Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, learner.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: learner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Learner Login: ${error.message}` });
  }
};

// Token Validation Controller
const validateToken = async (req, res) => {
  try {
    // If the request reaches here, the token is already validated by the authMiddleware
    res.status(200).send({ 
      message: "Token is valid", 
      success: true 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error validating token", success: false });
  }
};

module.exports = { registerLearner, loginLearner, validateToken };