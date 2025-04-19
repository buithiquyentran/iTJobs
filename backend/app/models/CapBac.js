const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const CapBac = sequelize.define("CapBac", {
  MA_CB: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  TEN_CB: { type: DataTypes.STRING, allowNull: false },
},
{
  timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  tableName: "cap_bac", // ✅ Giữ nguyên đúng tên bảng trong MySQL
  freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
});



module.exports = CapBac;
