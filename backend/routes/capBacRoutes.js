const express = require("express");
const router = express.Router();
const { getCapBacs } = require("../controllers/capBacControllers");
router.get("/", getCapBacs);

module.exports = router; 
