const express = require("express");
const router = express.Router();
const ungTuyen = require("../controllers/ungTuyen.controller");
router.route("/").get(ungTuyen.getAll).post(ungTuyen.create);
router.route("/ntd/:MA_NTD").get(ungTuyen.getByMA_NTD); // lấy ứng tuyển dựa MA_NTD
router.route("/username/:sdt").get(ungTuyen.getByUsername);
router
  .route("/:sdt/:maTtd")
  .patch(ungTuyen.update)
  .put(ungTuyen.update)
  .get(ungTuyen.getOne)
  .delete(ungTuyen.delete);

module.exports = router;
