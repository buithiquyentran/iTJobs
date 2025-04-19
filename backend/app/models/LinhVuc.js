const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
// const NhaTuyenDung = require("./NhaTuyenDung");
const LinhVuc = sequelize.define("LinhVuc", {
  MA_LV: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  TEN_LV: { type: DataTypes.STRING, allowNull: false },
},
{
  tableName: "linh_vuc", // ✅ Giữ nguyên đúng tên bảng trong MySQL
  freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
  timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
});

// LinhVuc.belongsToMany(NhaTuyenDung, {
//   through: "NHA_TUYEN_DUNG_LINH_VUC",
//   foreignKey: "MA_LV",
// });

module.exports = LinhVuc;
