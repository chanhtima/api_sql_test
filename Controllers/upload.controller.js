const db = require("../config/db");
const uploadModel = require("../Models/upload.model");
exports.postUpload = async (req, res) => {
  try {
    const { filename, mimetype, size } = req.file;
    const result = await uploadModel.uploadPost(filename, mimetype, size);
    res.status(201).json({
      message: "File uploaded successfully!",
      file: result,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      message: "Failed to upload file.",
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await uploadModel.uploadGet(id);
    res.status(200).json({
      message: "File retrieved successfully!",
      url: result.url,
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({
      message: "Failed to retrieve file.",
      error: error.message,
    });
  }
};
