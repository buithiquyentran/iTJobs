const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const NguoiLaoDong = require("./NguoiLaoDong");
const NhaTuyenDung = require("./NhaTuyenDung");

const NGUOI_LAO_DONG_FOLLOW = sequelize.define(
  "NGUOI_LAO_DONG_FOLLOW",
  {
    MA_NLD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: NguoiLaoDong, key: "MA_NLD" },
    },
    MA_NTD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: NhaTuyenDung, key: "MA_NTD" },
    },
    TRANG_THAI: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "nguoi_lao_dong_follow", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

// Định nghĩa quan hệ với NguoiLaoDong và NhaTuyenDung
// NGUOI_LAO_DONG_FOLLOW.belongsTo(NguoiLaoDong, {
//   foreignKey: "MA_NLD",
//   onDelete: "CASCADE",
// });
// NGUOI_LAO_DONG_FOLLOW.belongsTo(NhaTuyenDung, {
//   foreignKey: "MA_NTD",
//   onDelete: "CASCADE",
// });

// NguoiLaoDong.hasMany(NGUOI_LAO_DONG_FOLLOW, { foreignKey: "MA_NLD" });
// NhaTuyenDung.hasMany(NGUOI_LAO_DONG_FOLLOW, { foreignKey: "MA_NTD" });

module.exports = NGUOI_LAO_DONG_FOLLOW;
