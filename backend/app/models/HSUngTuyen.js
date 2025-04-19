const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
// const TinTuyenDung = require("./TinTuyenDung");
// const CV = require("./CV");

const HSUngTuyen = sequelize.define(
  "HSUngTuyen",
  {
    MA_HS: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TEN_UNG_TUYEN: { type: DataTypes.STRING, allowNull: false },
    EMAIL: { type: DataTypes.STRING, validate: { isEmail: true } },
    SDT: { type: DataTypes.STRING(10), allowNull: true },
    MA_CV: { type: DataTypes.INTEGER, allowNull: true }, // Khóa ngoại tới CV
    LOI_NHAN: { type: DataTypes.TEXT },
    MA_TTD: { type: DataTypes.INTEGER, allowNull: true }, // Khóa ngoại tới TinTuyenDung
  },
  {
    tableName: "hs_ung_tuyen", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

// Định nghĩa quan hệ với CV và TinTuyenDung
// HSUngTuyen.belongsTo(CV, { foreignKey: "MA_CV", onDelete: "SET NULL" });
// HSUngTuyen.belongsTo(TinTuyenDung, {
//   foreignKey: "MA_TTD",
//   onDelete: "CASCADE",
// });

module.exports = HSUngTuyen;
