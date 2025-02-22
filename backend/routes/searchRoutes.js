const express = require("express");
const router = express.Router();
const { getJobs, getCompanies } = require("../controllers/searchControllers");

router.get("/jobs", getJobs);
router.get("/companies", getCompanies);

module.exports = router;
