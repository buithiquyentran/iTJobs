const express = require("express");
const router = express.Router();
const kiNang = require("../controllers/kiNang.controller");
router.route("/").get(kiNang.getAll).post(kiNang.create);
router
  .route("/:id")
  .get(kiNang.getOne)
  .put(kiNang.update)
  .delete(kiNang.delete);

module.exports = router;
