const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const NguoiLaoDong = require("./NguoiLaoDong");
// const KiNang = require("./KiNang");
// const CapBac = require("./CapBac");
// const HSUngTuyen = require("./HSUngTuyen");
const CV = sequelize.define("CV", {
  MA_CV: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  TEN: { type: DataTypes.STRING, allowNull: false },
  NAM_SINH: { type: DataTypes.DATE, allowNull: false },
  EMAIL: { type: DataTypes.STRING, validate: { isEmail: true } },
  SDT: { type: DataTypes.STRING(10), allowNull: true },
  TP: { type: DataTypes.STRING }, // Thành phố
  GITHUB: { type: DataTypes.STRING },
  GIOI_THIEU: { type: DataTypes.TEXT },
  HOC_VAN: { type: DataTypes.STRING },
  DU_AN: { type: DataTypes.TEXT },
  MA_NLD: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: NguoiLaoDong, key: "MA_NLD" },
  }, // Khóa ngoại tới NguoiLaoDong
},
{
  tableName: "cv", // ✅ Giữ nguyên đúng tên bảng trong MySQL
  freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
  timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
});

// Định nghĩa quan hệ với NguoiLaoDong
// CV.belongsTo(NguoiLaoDong, { foreignKey: "MA_NLD", onDelete: "CASCADE" });
// CV.belongsToMany(KiNang, {
//   through: "CV_KI_NANG",
//   foreignKey: "MA_CV",
// });
// CV.belongsToMany(CapBac, {
//   through: "CV_CAP_BAC",
//   foreignKey: "MA_CV",
// });
// CV.hasMany(HSUngTuyen, { foreignKey: "MA_CV" });
module.exports = CV;
