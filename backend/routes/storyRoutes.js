const express = require("express");
const Story = require("../models/Story");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, name, story } = req.body;
    if (!email || !name || !story) {
      return res.status(400).json({ message: "Email, name, and story are required" });
    }

    const newStory = new Story({ email, name, story });
    await newStory.save();

    res.status(201).json({ message: "Story saved successfully!", story: newStory });
  } catch (error) {
    res.status(500).json({ message: "Error saving story", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }); 
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories", error: error.message });
  }
});

module.exports = router;