const express = require("express");
const router = express.Router();
const tinTuyenDung = require("../controllers/tinTuyenDung.controller");

router.route("/").get(tinTuyenDung.getAll).post(tinTuyenDung.create);
router.route("/status").get(tinTuyenDung.getAllTrue);
router.route("/ntd/:MA_NTD").get(tinTuyenDung.getByMA_NTD);

const { sequelize } = require("../config/db");

// API: Gợi ý các tin tương tự
router.route("/goi-y/:MA_TTD").get(tinTuyenDung.goiY);
router.route("/goi-y-ca-nhan/:MA_NLD").get(tinTuyenDung.goiYCaNhan);

router
  .route("/:id")
  .get(tinTuyenDung.getOne)
  .put(tinTuyenDung.update)
  .patch(tinTuyenDung.update)
  .delete(tinTuyenDung.delete);

module.exports = router;
