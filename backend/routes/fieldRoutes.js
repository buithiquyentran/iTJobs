const express = require("express");
const router = express.Router();
const { getLinhVucs } = require("../controllers/linhVucControllers");
router.get("/", getLinhVucs);

module.exports = router;
