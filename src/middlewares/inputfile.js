const multer = require("multer");
const path = require("path");

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Kindly upload file with csv format", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, "../../resources/data");
    cb(null,destinationPath);
    
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var store = multer({ storage: storage, fileFilter: csvFilter });
module.exports = store;