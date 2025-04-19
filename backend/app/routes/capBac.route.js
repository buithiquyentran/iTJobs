const express = require("express");
const router = express.Router();
const capBac = require("../controllers/capBac.controller");
router.route("/").get(capBac.getAll).post(capBac.create);
router
  .route("/:id")
  .get(capBac.getOne)
  .put(capBac.update) 
  .delete(capBac.delete); 

module.exports = router;
