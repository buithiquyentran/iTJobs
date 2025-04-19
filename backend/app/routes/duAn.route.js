const express = require("express");
const router = express.Router();
const duAn = require("../controllers/duAn.controller");
router.route("/").get(duAn.getAll).post(duAn.create);
router.route("/:id").get(duAn.getOne).put(duAn.update).delete(duAn.delete);

module.exports = router;
