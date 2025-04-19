const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const CV = require("./CV");
const DuAn = sequelize.define(
  "DuAn",
  {
    MA_DU_AN: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MA_CV: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CV,
        key: "MA_CV",
      },
      onDelete: "CASCADE",
    },
    TEN_DU_AN: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    THOI_GIAN_BAT_DAU: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    THOI_GIAN_KET_THUC: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    CONG_NGHE: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    MO_TA: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    NHIEM_VU: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    THANH_VIEN: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "DU_AN", // Tên bảng trong CSDL
    timestamps: false, // Nếu bảng không có cột createdAt, updatedAt
    freezeTableName: true, // Nếu muốn Sequelize KHÔNG tự thêm 's' vào tên bảng
  }
);

module.exports = DuAn;
