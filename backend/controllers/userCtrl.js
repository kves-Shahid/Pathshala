const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateEmail = require('../middlewares/emailValidator');
const ClassCodeModel = require('../models/classCodeModel');


const generateClassCode = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};


const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    const emailValidation = await validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({ message: emailValidation.message, success: false });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ message: 'User Already Exists', success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: 'Register Successfully', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;


    const emailValidation = await validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({ message: emailValidation.message, success: false });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({ message: 'User Not Found', success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: 'Invalid Email or Password', success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).send({ 
      message: 'Login Success', 
      success: true, 
      token, 
      role: "teacher" 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};


const createClass = async (req, res) => {
  try {
    const { className, section, subject, room } = req.body;
    const teacherId = req.user.id; 

    const code = await generateClassCode();

    const newClassCode = new ClassCodeModel({
      code,
      teacherId, 
      className,
      section,
      subject,
      room,
    });

    await newClassCode.save();
    res.status(201).json({ 
      code, 
      success: true, 
      message: "Class created successfully" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating class code", success: false });
  }
};

const getClasses = async (req, res) => {
  try {
    const teacherId = req.user.id; 
    const classes = await ClassCodeModel.find({ teacherId });

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "No classes found", success: false });
    }

    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Error fetching classes", success: false });
  }
};


const getClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const classDetails = await ClassCodeModel.findById(classId);

    if (!classDetails) {
      return res.status(404).json({ message: "Class not found", success: false });
    }

    res.status(200).json({ success: true, class: classDetails });
  } catch (error) {
    console.error("Error fetching class details:", error);
    res.status(500).json({ message: "Error fetching class details", success: false });
  }
};


const validateToken = async (req, res) => {
  try {
    res.status(200).send({ 
      message: 'Token is valid', 
      success: true 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error validating token', success: false });
  }
};

module.exports = { loginController, registerController, validateToken, createClass, getClassById, getClasses };