const express = require("express");
const router = express.Router();
const luuTtd = require("../controllers/luuTtd.controller");
router.route("/").get(luuTtd.getAll).post(luuTtd.create);
router.route("/:sdt").get(luuTtd.getByUsername);
router.route("/:sdt/:maTtd").get(luuTtd.getOne).delete(luuTtd.delete);

module.exports = router;
