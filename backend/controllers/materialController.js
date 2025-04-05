const Material = require("../models/materialModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");


exports.createMaterial = async (req, res) => {
  try {
    const { title, description, type, classId, isAnnouncement } = req.body;
    const files = req.files;

    let uploadResults = [];
    if (!isAnnouncement && files && files.length > 0) {
      uploadResults = await Promise.all(
        files.map((file) =>
          cloudinary.uploader.upload(file.path, {
            resource_type: "auto", 
            folder: "materials",
          })
        )
      );
    }


    const newMaterial = await Material.create({
      title,
      description,
      files: isAnnouncement ? [] : uploadResults.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
        type: result.resource_type,
      })),
      type: isAnnouncement ? "announcement" : type,
      classId,
    });


    if (files && files.length > 0) {
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
    }

    res.status(201).json({ message: "Material created successfully", success: true, newMaterial });
  } catch (error) {
    console.error("Error creating material:", error);
    res.status(500).json({ message: "Failed to create material", success: false });
  }
};


exports.getMaterials = async (req, res) => {
  try {
    const { classId } = req.params;


    const materials = await Material.find({ classId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Failed to fetch materials", success: false });
  }
};