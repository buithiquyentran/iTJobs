const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Role = sequelize.define("Role", {
  MA_ROLE: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ROLE_NAME: { type: DataTypes.STRING, allowNull: false },
},
{
  tableName: "role", // ✅ Giữ nguyên đúng tên bảng trong MySQL
  freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
  timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
});

// Role.hasMany(User, { foreignKey: "MA_ROLE" });
module.exports = Role;
