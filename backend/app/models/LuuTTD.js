// models/LuuTTD.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const TinTuyenDung = require("./TinTuyenDung");

const LuuTTD = sequelize.define(
  "LuuTTD",
  {
    SDT: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: User,
        key: "SDT",
      },
      primaryKey: true, // Tạo khóa chính kết hợp
    },
    MA_TTD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TinTuyenDung,
        key: "MA_TTD",
      },
      primaryKey: true, // Tạo khóa chính kết hợp
    },
    NGAY_LUU: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Tự động lưu ngày lưu tin
    },
  },
  {
    tableName: "LUU_TTD",
    timestamps: false, // Không thêm createdAt, updatedAt
  }
);

// User.hasMany(LuuTTD, { foreignKey: "SDT" });
// TinTuyenDung.hasMany(LuuTTD, { foreignKey: "MA_TTD" });
// LuuTTD.belongsTo(User, { foreignKey: "SDT" });
// LuuTTD.belongsTo(TinTuyenDung, { foreignKey: "MA_TTD" });

module.exports = LuuTTD;
