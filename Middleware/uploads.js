const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Get the upload directory path from environment variables or default to a local path
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "../public/uploads");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.access(uploadDir, (error) => {
      if (error) {
        fs.mkdir(uploadDir, { recursive: true }, (error) => cb(error, uploadDir));
      } else {
        cb(null, uploadDir);
      }
    });
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
      false
    );
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
