const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const NguoiLaoDong = require("./NguoiLaoDong");
const KiNang = require("./KiNang");

const NGUOI_LAO_DONG_KI_NANG = sequelize.define("NGUOI_LAO_DONG_KI_NANG", {
  MA_NLD: { type: DataTypes.INTEGER, primaryKey: true, references: { model: NguoiLaoDong, key: "MA_NLD" } },
  MA_KN: { type: DataTypes.INTEGER, primaryKey: true , references: { model: KiNang, key: "MA_KN" }},
},
{
  tableName: "nguoi_lao_dong_ki_nang", // ✅ Giữ nguyên đúng tên bảng trong MySQL
  freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
  timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
});

module.exports = NGUOI_LAO_DONG_KI_NANG;
