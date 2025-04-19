const express = require("express");
const router = express.Router();
const loaiHinh = require("../controllers/loaiHinh.controller");
router.route("/").get(loaiHinh.getAll).post(loaiHinh.create);
router
  .route("/:id")
  .get(loaiHinh.getOne)
  .put(loaiHinh.update)
  .delete(loaiHinh.delete);

module.exports = router;
