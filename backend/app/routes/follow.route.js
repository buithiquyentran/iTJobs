const express = require("express");
const router = express.Router();
const follow = require("../controllers/follow.controller");
router.route("/").get(follow.getAll).post(follow.create);

router.route("/ma-nld/:maNld").get(follow.getByMA_NLD);
router.route("/ma-ntd/:maNtd").get(follow.getByMA_NTD);

router
  .route("/:maNld/:maNtd")
  .get(follow.getOne)
  .put(follow.update)
  .delete(follow.delete);

module.exports = router;
