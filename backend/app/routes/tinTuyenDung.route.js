const express = require("express");
const router = express.Router();
const tinTuyenDung = require("../controllers/tinTuyenDung.controller");

router.route("/").get(tinTuyenDung.getAll).post(tinTuyenDung.create);
router.route("/ntd/:MA_NTD").get(tinTuyenDung.getByMA_NTD);

router
  .route("/:id")
  .get(tinTuyenDung.getOne)
  .put(tinTuyenDung.update)
  .patch(tinTuyenDung.update)
  .delete(tinTuyenDung.delete);

module.exports = router;
