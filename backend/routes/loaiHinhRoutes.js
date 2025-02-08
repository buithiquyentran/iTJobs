const express = require("express");
const router = express.Router();
const { getLoaiHinhs } = require("../controllers/loaiHinhControllers");
router.get("/", getLoaiHinhs);

module.exports = router;
