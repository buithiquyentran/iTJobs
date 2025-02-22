const express = require("express");
const router = express.Router();
const {
  getNhaTuyenDungLinhVuc,
  getEmployers,
  getEmployer,
  getNhaTuyenDungKiNang,
} = require("../controllers/employerControllers");

// Route lấy lĩnh vực của nhà tuyển dụng
router.get("/", getEmployers);
router.get("/:id", getEmployer);
router.get("/:id/linh-vuc", getNhaTuyenDungLinhVuc);
router.get("/:id/ki-nang", getNhaTuyenDungKiNang); 

module.exports = router;
