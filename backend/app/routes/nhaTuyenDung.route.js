const express = require("express");
const router = express.Router();
const nhaTuyenDung = require("../controllers/nhaTuyenDung.controller");
router.route("/").get(nhaTuyenDung.getAll).post(nhaTuyenDung.create);
router.route("/status").get(nhaTuyenDung.getAllStatus);
router.route("/goi-y/:MA_NTD").get(nhaTuyenDung.goiY);
router
  .route("/:id")
  .get(nhaTuyenDung.getOne)
  .put(nhaTuyenDung.update)
  .delete(nhaTuyenDung.delete);

module.exports = router;
