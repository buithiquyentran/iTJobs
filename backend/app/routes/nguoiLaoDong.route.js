const express = require("express");
const router = express.Router();
const nguoiLaoDong = require("../controllers/nguoiLaoDong.controller");
router.route("/").get(nguoiLaoDong.getAll).post(nguoiLaoDong.create);
router
  .route("/:id")
  .get(nguoiLaoDong.getOne)
  .patch(nguoiLaoDong.update)
  .delete(nguoiLaoDong.delete);

module.exports = router;
