const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "jpeg" ||
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "gif" ||
    file.mimetype.split("/")[1] === "jfif"
  ) {
    cb(null, true);
    const multerError = false;
    module.exports = { multerError: multerError };
  } else {
    cb(false);
    const multerError = true;
    module.exports = { multerError: multerError };
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = { upload: upload };
