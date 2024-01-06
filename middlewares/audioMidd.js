const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "sounds");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, Date.now() + name);
  },
});

const audioMidd = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "audio/mp3" ||
      file.mimetype == "audio/ogg" ||
      file.mimetype == "audio/mpeg"
    ) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
});

module.exports = audioMidd;
