const PressRequest = require("../models/pressRequest");
const sendEmail = require("../config/sendEmail");

exports.submitPressRequest = async (req, res) => {
  try {
    const { email, type, message } = req.body;
    if (!email || !type || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new PressRequest({ email, type, message });
    await newRequest.save(); 

    await sendEmail(email, "Press Request Received", `Your request for '${type}' has been received.`);

    res.status(201).json({ message: "Request submitted! Check your email for confirmation." });
  } catch (error) {
    res.status(500).json({ message: "Error submitting request", error });
  }
};