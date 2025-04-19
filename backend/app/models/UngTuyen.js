// models/UngTuyen.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const TinTuyenDung = require("./TinTuyenDung");
const CV = require("./CV");

const UngTuyen = sequelize.define(
  "UngTuyen",
  {
    SDT: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: User,
        key: "SDT",
      },
      primaryKey: true,
    },
    MA_TTD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TinTuyenDung,
        key: "MA_TTD",
      },
      primaryKey: true,
    },
    MA_CV: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: CV,
        key: "MA_CV",
      },
    },
    NGAY_UNG_TUYEN: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Tự động lưu ngày ứng tuyển
    },
    CV_LINK: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TRANG_THAI: {
      type: DataTypes.INTEGER,
      defaultValue: 0, //0: pending, 1: accepted, -1: reject
    },
    LY_DO_TU_CHOI: {
      type: DataTypes.STRING(255), // Lý do từ chối (nếu có)
      allowNull: true,
    },
    HO_TEN: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    EMAIL: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SDT_UNG_VIEN: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    LOI_NHAN: {
      type: DataTypes.STRING(1024), // Lý do từ chối (nếu có)
      allowNull: true,
    },
  },
  {
    tableName: "UNG_TUYEN",
    timestamps: false, // Không thêm createdAt, updatedAt
  }
);

// User.hasMany(UngTuyen, { foreignKey: "SDT" });
// TinTuyenDung.hasMany(UngTuyen, { foreignKey: "MA_TTD" });
// UngTuyen.belongsTo(User, { foreignKey: "SDT" });
// UngTuyen.belongsTo(TinTuyenDung, { foreignKey: "MA_TTD" });

module.exports = UngTuyen;
