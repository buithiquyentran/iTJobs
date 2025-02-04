const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Role = require("./Role");
// const Admin = require("./Admin");
// const NguoiLaoDong = require("./NguoiLaoDong");
// const NhaTuyenDung = require("./NhaTuyenDung");

const User = sequelize.define(
  "User",
  {
    SDT: { type: DataTypes.STRING(10), primaryKey: true },
    MK: { type: DataTypes.STRING },
    IS_APPROVED: { type: DataTypes.BOOLEAN },
    MA_ROLE: {
      type: DataTypes.INTEGER,
      references: { model: Role, key: "MA_ROLE" },
    },
  },
  {
    tableName: "user", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

// User.belongsTo(Role, { foreignKey: "MA_ROLE" });

// User.hasMany(Admin, { foreignKey: "SDT" });
// User.hasMany(NguoiLaoDong, { foreignKey: "SDT" });
// User.hasMany(NhaTuyenDung, { foreignKey: "SDT" });

module.exports = User;
