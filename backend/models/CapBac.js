const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
// const NguoiLaoDong = require("./NguoiLaoDong");
// const TinTuyenDung = require("./TinTuyenDung");
// const CV = require("./CV");

const CapBac = sequelize.define("CapBac", {
  MA_CB: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  TEN_CB: { type: DataTypes.STRING, allowNull: false },
},
{
  timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  tableName: "cap_bac", // ✅ Giữ nguyên đúng tên bảng trong MySQL
  freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
});

// CapBac.belongsToMany(NguoiLaoDong, {
//   through: "NGUOI_LAO_DONG_CAP_BAC",
//   foreignKey: "MA_CB",
// });

// CapBac.belongsToMany(TinTuyenDung, {
//   through: "TIN_TUYEN_DUNG_CAP_BAC",
//   foreignKey: "MA_CB",
// });
// CapBac.belongsToMany(CV, {
//   through: "CV_CAP_BAC",
//   foreignKey: "MA_CB",
// });

module.exports = CapBac;
