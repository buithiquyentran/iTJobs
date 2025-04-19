const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth.controller");

router.post("/login", Auth.login);
router.post("/logout", Auth.logout);
router.post("/register-employee", Auth.registerEmployee);
router.post("/register-employer", Auth.registerEmployer);
router.get("/user-info", Auth.getUserInfo);

module.exports = router;
