const learnerModel = require("../models/learnerModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = require("../middlewares/emailValidator");

const registerLearner = async (req, res) => {
  try {
    const { email, password } = req.body;


    const emailValidation = await validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({ message: emailValidation.message, success: false });
    }

    const existingLearner = await learnerModel.findOne({ email });
    if (existingLearner) {
      return res.status(400).json({ message: "Learner Already Exists", success: false });
    }

 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;


    const newLearner = new learnerModel(req.body);
    await newLearner.save();

    res.status(201).json({ message: "Learner Registered Successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Error in Register Learner: ${error.message}` });
  }
};


const loginLearner = async (req, res) => {
  try {
    const { email, password } = req.body;


    const emailValidation = await validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({ message: emailValidation.message, success: false });
    }

    const learner = await learnerModel.findOne({ email });
    if (!learner) {
      return res.status(400).json({ message: "Learner Not Found", success: false });
    }


    const isMatch = await bcrypt.compare(password, learner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password", success: false });
    }

   
    const token = jwt.sign({ id: learner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ 
      message: "Login Success", 
      success: true, 
      token, 
      role: "learner" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error in Learner Login: ${error.message}`, success: false });
  }
};


const validateToken = async (req, res) => {
  try {
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