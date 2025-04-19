const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const NguoiLaoDong = sequelize.define(
  "NguoiLaoDong",
  {
    MA_NLD: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TEN_NLD: { type: DataTypes.STRING, allowNull: false },
    NAM_SINH: { type: DataTypes.DATE },
    GIOI_TINH: { type: DataTypes.ENUM("Nam", "Nữ", "Khác") },
    QUE_QUAN: { type: DataTypes.STRING },
    EMAIL: { type: DataTypes.STRING },
    HOC_VAN: { type: DataTypes.STRING },
    CV_LINK: { type: DataTypes.JSON },

    SDT: {
      type: DataTypes.STRING(10),
      references: { model: User, key: "SDT" },
    },
  },
  {
    tableName: "nguoi_lao_dong", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = NguoiLaoDong;
