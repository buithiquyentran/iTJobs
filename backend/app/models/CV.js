const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const NguoiLaoDong = require("./NguoiLaoDong");
const { KiNang } = require(".");

const CV = sequelize.define(
  "CV",

  {
    MA_CV: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TEN_CV: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HO_TEN: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NAM_SINH: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EMAIL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SDT: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    TP: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GITHUB: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GIOI_THIEU: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    HOC_VAN: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    MUC_TIEU_NGHE_NGHIEP: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    CHUNG_CHI: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    KINH_NGHIEM: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    KiNangs: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    MA_NLD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: NguoiLaoDong, key: "MA_NLD" },
    }, // Khóa ngoại tới NguoiLaoDong
  },

  {
    tableName: "CV", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = CV;
