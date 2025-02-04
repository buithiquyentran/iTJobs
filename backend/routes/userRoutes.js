const express = require("express");
const router = express.Router();
const { getUsers, getEmployers } = require("../controllers/userControllers");

router.get("/", getUsers);
router.get("/employers", getEmployers);

module.exports = router;
