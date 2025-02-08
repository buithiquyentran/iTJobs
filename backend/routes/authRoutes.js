const express = require("express");
const router = express.Router();
const {
  login,
  registerEmployee,
  registerEmployer,
} = require("../controllers/authControllers");

router.post("/login", login);
router.post("/register-employee", registerEmployee);
router.post("/register-employer", registerEmployer);

module.exports = router;