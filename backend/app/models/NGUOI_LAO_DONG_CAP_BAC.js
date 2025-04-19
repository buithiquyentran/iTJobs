const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const NguoiLaoDong = require("./NguoiLaoDong");
const CapBac = require("./CapBac");

const NGUOI_LAO_DONG_CAP_BAC = sequelize.define(
  "NGUOI_LAO_DONG_CAP_BAC",
  {
    MA_NLD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: NguoiLaoDong, key: "MA_NLD" },
    },
    MA_CB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CapBac, key: "MA_CB" },
    },
  },
  {
    tableName: "nguoi_lao_dong_cap_bac", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = NGUOI_LAO_DONG_CAP_BAC;
