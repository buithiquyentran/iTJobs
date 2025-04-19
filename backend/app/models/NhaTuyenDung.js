const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const NhaTuyenDung = sequelize.define(
  "NhaTuyenDung",
  {
    MA_NTD: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TEN_NTD: { type: DataTypes.STRING, allowNull: false },
    LOGAN: { type: DataTypes.STRING, allowNull: true },
    IMG: { type: DataTypes.STRING, allowNull: true },
    LOGO: { type: DataTypes.STRING, allowNull: true },
    ABOUT: { type: DataTypes.JSON, allowNull: true },
    QUY_MO: { type: DataTypes.STRING, allowNull: true },
    QUOC_TICH: { type: DataTypes.STRING, allowNull: true },
    DAI_NGO: { type: DataTypes.JSON, allowNull: true },
    DIA_CHI: { type: DataTypes.STRING, allowNull: true },
    DIA_CHI_CU_THE: { type: DataTypes.JSON, allowNull: true },
    LINK: { type: DataTypes.STRING, allowNull: true },
    WEBSITE: { type: DataTypes.STRING, allowNull: true },
    MST: { type: DataTypes.STRING, allowNull: true },
    EMAIL: { type: DataTypes.STRING },
    SDT: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: { model: User, key: "SDT" },
    },
  },
  {
    tableName: "nha_tuyen_dung", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = NhaTuyenDung;
