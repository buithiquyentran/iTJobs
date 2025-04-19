const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const CV = require("./CV");
const KiNang = require("./KiNang");

const CV_KI_NANG = sequelize.define(
  "CV_KI_NANG",
  {
    MA_CV: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CV, key: "MA_CV" },
    },
    MA_KN: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: KiNang, key: "MA_KN" },
    },
  },
  {
    tableName: "cv_ki_nang", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = CV_KI_NANG;
