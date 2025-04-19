const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const uploadImage = require("../controllers/upload.controller");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//  Đảm bảo upload.single("image") đúng tên field từ form
router.route("/").post(upload.single("image"), uploadImage.uploadImage);
router
  .route("/upload-cv/:MA_NLD") 
  .post(upload.single("cv"), uploadImage.uploadCV);
module.exports = router;
