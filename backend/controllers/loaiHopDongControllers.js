const { sequelize, LoaiHopDong } = require("../models");
exports.getLoaiHDs = async (req, res) => {
  try {
    const lhds = await LoaiHopDong.findAll();
    const TEN_LOAI_HD = lhds.map((lhd) => lhd.TEN_LOAI_HD);
    res.json(TEN_LOAI_HD);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};  

