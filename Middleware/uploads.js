const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.resolve(__dirname, "../tmp/uploads"); // Use path.resolve for absolute path
    fs.access(dir, fs.constants.F_OK, (err) => { // Use fs.access to check if directory exists
      if (err) {
        // Directory does not exist, create it
        fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
      } else {
        // Directory exists
        cb(null, dir);
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
