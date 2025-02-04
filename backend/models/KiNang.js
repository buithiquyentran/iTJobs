const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
// const TinTuyenDung = require("./TinTuyenDung");
// const CV = require("./CV");
// const NhaTuyenDung = require("./NhaTuyenDung");
const KiNang = sequelize.define("KiNang", {
  MA_KN: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  TEN_KN: { type: DataTypes.STRING, allowNull: false },
},
{
  tableName: "ki_nang", // ✅ Giữ nguyên đúng tên bảng trong MySQL
  freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
  timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
});
// KiNang.belongsToMany(NguoiLaoDong, {
//   through: "NGUOI_LAO_DONG_KI_NANG",
//   foreignKey: "MA_KN",
// });
// KiNang.belongsToMany(TinTuyenDung, {
//   through: "TIN_TUYEN_DUNG_KI_NANG",
//   foreignKey: "MA_KN",
// });
// KiNang.belongsToMany(CV, {
//   through: "CV_KI_NANG",
//   foreignKey: "MA_KN",
// });
// KiNang.belongsToMany(NhaTuyenDung, {
//   through: "NHA_TUYEN_DUNG_KI_NANG",
//   foreignKey: "MA_KN",
// });
module.exports = KiNang;
