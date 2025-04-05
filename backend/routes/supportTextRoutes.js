const express = require("express");
const SupportText = require("../models/supportTextModel");
const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const texts = await SupportText.find({ $text: { $search: query } });
    res.json(texts);
  } catch (error) {
    console.error("Error searching support texts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/upload", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const newText = new SupportText({ title, content });
    await newText.save();
    res.status(201).json(newText);
  } catch (error) {
    console.error("Error uploading support text:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;