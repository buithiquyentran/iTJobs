const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const TinTuyenDung = require("./TinTuyenDung");
const CapBac = require("./CapBac");

const TIN_TUYEN_DUNG_CAP_BAC = sequelize.define(
  "TIN_TUYEN_DUNG_CAP_BAC",
  {
    MA_TTD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: TinTuyenDung, key: "MA_TTD" },
    },
    MA_CB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CapBac, key: "MA_CB" },
    },
  },
  {
    tableName: "tin_tuyen_dung_cap_bac", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = TIN_TUYEN_DUNG_CAP_BAC;
