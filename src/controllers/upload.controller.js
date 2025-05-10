const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save in uploads/ folder
  },
  filename: function (req, file, cb) {
    // Rename file with timestamp to avoid name conflict
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter (optional): allow images only
const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG images are allowed'), false);
  }
};

// Set upload
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
