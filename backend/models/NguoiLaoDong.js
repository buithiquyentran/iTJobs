const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
// const KiNang = require("./KiNang");
// const NhaTuyenDung = require("./NhaTuyenDung");
// const CapBac = require("./CapBac");
// const NGUOI_LAO_DONG_FOLLOW = require("./NGUOI_LAO_DONG_FOLLOW")
const NguoiLaoDong = sequelize.define("NguoiLaoDong", {
  MA_NLD: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  TEN_NLD: { type: DataTypes.STRING, allowNull: false },
  NAM_SINH: { type: DataTypes.DATE, allowNull: false },
  GIOI_TINH: { type: DataTypes.ENUM("Nam", "Nữ", "Khác") },
  QUE_QUAN: { type: DataTypes.STRING },
  EMAIL: { type: DataTypes.STRING },
  HOC_VAN: { type: DataTypes.STRING },
  SDT: { type: DataTypes.STRING(10), allowNull:true, references: { model: User, key: "SDT" } },
},
{
  tableName: "nguoi_lao_dong", // ✅ Giữ nguyên đúng tên bảng trong MySQL
  freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
  timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
});

// NguoiLaoDong.belongsTo(User, { foreignKey: "SDT" });

// NguoiLaoDong.belongsToMany(KiNang, {
//   through: "NGUOI_LAO_DONG_KI_NANG",
//   foreignKey: "MA_NLD",
// });
// NguoiLaoDong.belongsToMany(CapBac, {
//   through: "NGUOI_LAO_DONG_CAP_BAC",
//   foreignKey: "MA_NLD",
// });
// NguoiLaoDong.belongsToMany(NhaTuyenDung, {
//   through: NGUOI_LAO_DONG_FOLLOW,
//   foreignKey: "MA_NLD",
// });
// NguoiLaoDong.hasMany(CV,{ foreignKey: "MA_NLD" } )
module.exports = NguoiLaoDong;
