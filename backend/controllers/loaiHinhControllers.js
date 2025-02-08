const { sequelize, LoaiHinh } = require("../models");
exports.getLoaiHinhs = async (req, res) => {
  try {
    const lhs = await LoaiHinh.findAll();
    const TEN_LOAI_HINH = lhs.map((lh) => lh.TEN_LOAI_HINH);
    res.json(TEN_LOAI_HINH);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
