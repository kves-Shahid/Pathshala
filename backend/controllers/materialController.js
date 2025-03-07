const Material = require("../models/materialModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Create a new material (announcement, assignment, quiz, or material)
exports.createMaterial = async (req, res) => {
  try {
    const { title, description, type, classId } = req.body;
    const files = req.files;

    // Check if the user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can upload files", success: false });
    }

    // Upload files to Cloudinary
    const uploadResults = await Promise.all(
      files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          resource_type: "auto", // Automatically detect image/video
          folder: "materials",
        })
      )
    );

    // Save material to MongoDB
    const newMaterial = await Material.create({
      title,
      description,
      files: uploadResults.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
        type: result.resource_type,
      })),
      type,
      classId,
    });

    // Delete temporary files
    files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    res.status(201).json({ message: "Material created successfully", success: true, newMaterial });
  } catch (error) {
    console.error("Error creating material:", error);
    res.status(500).json({ message: "Failed to create material", success: false });
  }
};

// Fetch materials for a specific class
exports.getMaterials = async (req, res) => {
  try {
    const { classId } = req.params;

    // Fetch materials for the class
    const materials = await Material.find({ classId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Failed to fetch materials", success: false });
  }
};