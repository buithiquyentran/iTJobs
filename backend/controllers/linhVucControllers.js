const { sequelize, LinhVuc } = require("../models");
exports.getLinhVucs = async (req, res) => {
  try {
    const lvs = await LinhVuc.findAll(); // Lấy tất cả công việc từ bảng Job
    const TEN_LV = lvs.map((lv) => lv.TEN_LV);
    res.json(TEN_LV);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
