const express = require("express");
const router = express.Router();
const { getLoaiHDs } = require("../controllers/loaiHopDongControllers");
router.get("/", getLoaiHDs);

module.exports = router;
