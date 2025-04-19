const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
router.route("/").get(user.getAll).post(user.create);
router.route("/employers").get(user.getEmployers);
router.route("/employees").get(user.getEmployees);

router.route("/:id").get(user.getOne).patch(user.update).delete(user.delete);

module.exports = router;
