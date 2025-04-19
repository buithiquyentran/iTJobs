const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const LoaiHinh = sequelize.define(
  "LoaiHinh",
  {
    MA_LOAI_HINH: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TEN_LOAI_HINH: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "loai_hinh",
    freezeTableName: true,
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);
module.exports = LoaiHinh;
