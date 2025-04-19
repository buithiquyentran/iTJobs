const express = require("express");
const router = express.Router();
const thongBao = require("../controllers/thongBao.controller");
router.route("/").get(thongBao.getAll).post(thongBao.create);
router.route("/username/:id").get(thongBao.getByUsername);

router
  .route("/:id")
  .get(thongBao.getOne)
  .patch(thongBao.update)
  .delete(thongBao.delete);

module.exports = router;
