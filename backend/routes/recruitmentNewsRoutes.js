const express = require("express");
const router = express.Router();
const {
  getRecruitment,
  getRecruitments,
  getRecruitmentWithCompany,
  getTinTuyenDungKiNang,
  getTinTuyenDungCapBac,
  getRecruitmentsByCompany,
} = require("../controllers/recruitmentNewsControllers");

router.get("/with-company", getRecruitmentWithCompany);
router.get("/company/:ma_ntd", getRecruitmentsByCompany);
router.get("/", getRecruitments);
router.get("/:id/with-company", getRecruitmentWithCompany);
router.get("/:id/ki-nang", getTinTuyenDungKiNang);
router.get("/:id/cap-bac", getTinTuyenDungCapBac);
router.get("/:id", getRecruitment);

module.exports = router;
