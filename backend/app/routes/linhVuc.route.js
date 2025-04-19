
const express = require("express");
const router = express.Router();
const linhVuc = require("../controllers/linhVuc.controller");
router.route("/").get(linhVuc.getAll).post(linhVuc.create);
router
  .route("/:id")
  .get(linhVuc.getOne)
  .put(linhVuc.update)
  .delete(linhVuc.delete);

module.exports = router;
