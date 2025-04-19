const express = require("express");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const cv = require("../controllers/cv.controller");
router.route("/").get(cv.getAll).post(cv.create);
router
  .route("/:id")
  .get(authenticate, cv.getOne)
  .patch(cv.update)
  .delete(cv.delete);
router.route("/username/:MA_NLD").get(cv.findByMA_NLD);
module.exports = router;
