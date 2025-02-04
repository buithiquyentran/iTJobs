const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { User } = require("./User");

const Admin = sequelize.define(
  "Admin",
  {
    MA_ADMIN: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TEN_ADMIN: { type: DataTypes.STRING, allowNull: false },
    NAM_SINH: { type: DataTypes.DATE, allowNull: false },
    GIOI_TINH: { type: DataTypes.ENUM("Nam", "Nữ", "Khác"), allowNull: false },
    SDT: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: User, key: "SDT" },
    },
  },
  {
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
    tableName: "admin", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
  }
);

// Admin.belongsTo(User, { foreignKey: "SDT" });
module.exports = Admin;
