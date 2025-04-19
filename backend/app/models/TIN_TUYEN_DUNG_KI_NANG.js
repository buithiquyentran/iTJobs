const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const TinTuyenDung = require("./TinTuyenDung");
const KiNang = require("./KiNang");

const TIN_TUYEN_DUNG_KI_NANG = sequelize.define(
  "TIN_TUYEN_DUNG_KI_NANG",
  {
    MA_TTD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: TinTuyenDung, key: "MA_TTD" },
    },
    MA_KN: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: KiNang, key: "MA_KN" },
    },
  },
  {
    tableName: "tin_tuyen_dung_ki_nang", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = TIN_TUYEN_DUNG_KI_NANG;
