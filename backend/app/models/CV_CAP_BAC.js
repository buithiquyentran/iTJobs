const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const CV = require("./CV");
const CapBac = require("./CapBac");

const CV_CAP_BAC = sequelize.define(
  "CV_CAP_BAC",
  {
    MA_CV: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CV, key: "MA_CV" },
    },
    MA_CB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: CapBac, key: "MA_CB" },
    },
  },
  {
    tableName: "cv_cap_bac", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = CV_CAP_BAC;
