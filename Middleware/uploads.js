const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../public/uploads'); // Use __dirname to ensure the correct path
    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        // Directory does not exist, create it
        fs.mkdir(dir, { recursive: true }, (error) => {
          if (error) {
            return cb(error);
          }
          cb(null, dir);
        });
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

// File filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
