const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const LoaiHopDong = sequelize.define(
  "LoaiHopDong",
  {
    MA_LOAI_HD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TEN_LOAI_HD: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "loai_hop_dong",
    freezeTableName: true,
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);
module.exports = LoaiHopDong;
