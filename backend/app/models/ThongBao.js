// models/ThongBao.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");


const ThongBao = sequelize.define(
  "ThongBao",
  {
    MA_TB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    SDT: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: User,
        key: "SDT",
      },
      primaryKey: true,
    },
    NGAY: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Tự động lưu ngày ứng tuyển
    },
    DA_XEM: {
      type: DataTypes.INTEGER,
      defaultValue: 0, //0: xem, 1: chua xem,
    },

    NOI_DUNG: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "THONG_BAO",
    timestamps: false, // Không thêm createdAt, updatedAt
  }
);
// User.hasMany(ThongBao, { foreignKey: "SDT" });

// ThongBao.belongsTo(User, { foreignKey: "SDT" });


module.exports = ThongBao;
