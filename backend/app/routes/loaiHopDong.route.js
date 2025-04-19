// const express = require("express");
// const router = express.Router();
// const { getLoaiHDs } = require("../controllers/loaiHopDongControllers");
// router.get("/", getLoaiHDs);

// module.exports = router;
 
const express = require("express");
const router = express.Router();
const loaiHopDong = require("../controllers/loaiHopDong.controller");
router.route("/").get(loaiHopDong.getAll).post(loaiHopDong.create);
router
  .route("/:id")
  .get(loaiHopDong.getOne)
  .put(loaiHopDong.update)
  .delete(loaiHopDong.delete);

module.exports = router;
