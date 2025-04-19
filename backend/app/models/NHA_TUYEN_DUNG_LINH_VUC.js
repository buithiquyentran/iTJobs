const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const NhaTuyenDung = require("./NhaTuyenDung");
const LinhVuc = require("./LinhVuc");

const NHA_TUYEN_DUNG_LINH_VUC = sequelize.define(
  "NHA_TUYEN_DUNG_LINH_VUC",
  {
    MA_NTD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: NhaTuyenDung, key: "MA_NTD" },
    },
    MA_LV: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: LinhVuc, key: "MA_LV" },
    },
  },
  {
    tableName: "nha_tuyen_dung_linh_vuc", // ✅ Giữ nguyên đúng tên bảng trong MySQL
    freezeTableName: true, // ✅ Ngăn Sequelize tự động đổi thành "Users"
    timestamps: false, //Tắt timestamps để không tự động thêm createdAt, updatedAt
  }
);

module.exports = NHA_TUYEN_DUNG_LINH_VUC;
