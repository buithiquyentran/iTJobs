const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const NhaTuyenDung = require("./NhaTuyenDung");
const TinTuyenDung = sequelize.define(
  "TinTuyenDung",
  {
    MA_TTD: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TEN_TTD: { type: DataTypes.STRING, allowNull: false },
    DIA_CHI: { type: DataTypes.STRING, allowNull: true },
    DIA_CHI_CU_THE: { type: DataTypes.JSON, allowNull: true },
    NGAY: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"), // ✅ Đảm bảo giống MySQL
      allowNull: false,
    },
    MUC_LUONG: { type: DataTypes.STRING, defaultValue: "Thương lượng" },
    TRACH_NHIEM: { type: DataTypes.JSON, allowNull: true },
    CHUYEN_MON: { type: DataTypes.JSON, allowNull: true },
    NICE_TO_HAVE: { type: DataTypes.JSON, allowNull: true },
    PHUC_LOI: { type: DataTypes.JSON, allowNull: true },
    QUI_TRINH_PV: { type: DataTypes.JSON, allowNull: true },
    LINK: { type: DataTypes.STRING, allowNull: true },
    MA_NTD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: NhaTuyenDung, key: "MA_NTD" },
      onDelete: "CASCADE", // ✅ Đảm bảo dữ liệu xóa đúng logic
    },
  },
  {
    tableName: "tin_tuyen_dung", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);
  
module.exports = TinTuyenDung;
