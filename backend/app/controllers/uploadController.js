const { sequelize } = require("../models");

exports.uploadImage = async (req, res) => {
  try {
    const { MA_NTD, type } = req.body;

    // Kiểm tra file đã được upload chưa
    if (!req.file) {
      return res.status(400).json({ message: "Chưa upload file" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    // Xác định cột cần cập nhật
    const column = type === "LOGO" ? "LOGO" : "IMG";

    // Thực thi câu lệnh SQL
    await sequelize.query(
      `UPDATE NHA_TUYEN_DUNG SET ${column} = :imageUrl WHERE MA_NTD = :MA_NTD`,
      {
        replacements: { imageUrl, MA_NTD },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    res.json({
      message: "Upload thành công",
      url: `http://localhost:5000${imageUrl}`,
    });
  } catch (error) {
    console.error("Lỗi upload ảnh: ", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};
