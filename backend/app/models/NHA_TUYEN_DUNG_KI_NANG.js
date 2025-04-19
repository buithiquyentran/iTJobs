const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const NhaTuyenDung = require("./NhaTuyenDung");
const KiNang = require("./KiNang");

const NHA_TUYEN_DUNG_KI_NANG = sequelize.define(
  "NHA_TUYEN_DUNG_KI_NANG",
  {
    MA_NTD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: NhaTuyenDung, key: "MA_NTD" },
    },
    MA_KN: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: KiNang, key: "MA_KN" },
    },
  },
  {
    tableName: "nha_tuyen_dung_ki_nang", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = NHA_TUYEN_DUNG_KI_NANG;
