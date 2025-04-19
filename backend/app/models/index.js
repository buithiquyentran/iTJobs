const { sequelize } = require("../config/db");
// Import models

const LinhVuc = require("./LinhVuc");
const KiNang = require("./KiNang");
const LoaiHinh = require("./LoaiHinh");
const LoaiHopDong = require("./LoaiHopDong");
const CapBac = require("./CapBac");
const Role = require("./Role");
const User = require("./User");
const NguoiLaoDong = require("./NguoiLaoDong");
const CV = require("./CV");
const DuAn = require("./DuAn");
const Admin = require("./Admin");
const NhaTuyenDung = require("./NhaTuyenDung");
const TinTuyenDung = require("./TinTuyenDung");
const HSUngTuyen = require("./HSUngTuyen");
const NGUOI_LAO_DONG_FOLLOW = require("./NGUOI_LAO_DONG_FOLLOW");
const UngTuyen = require("./UngTuyen");
const LuuTTD = require("./LuuTTD");
const ThongBao = require("./ThongBao");
const NGUOI_LAO_DONG_KI_NANG = require("./NGUOI_LAO_DONG_KI_NANG");
const NGUOI_LAO_DONG_CAP_BAC = require("./NGUOI_LAO_DONG_CAP_BAC");
const NHA_TUYEN_DUNG_KI_NANG = require("./NHA_TUYEN_DUNG_KI_NANG");
const NHA_TUYEN_DUNG_LINH_VUC = require("./NHA_TUYEN_DUNG_LINH_VUC");
const TIN_TUYEN_DUNG_KI_NANG = require("./TIN_TUYEN_DUNG_KI_NANG");
const TIN_TUYEN_DUNG_CAP_BAC = require("./TIN_TUYEN_DUNG_CAP_BAC");

const CV_CAP_BAC = require("./CV_CAP_BAC");
const CV_KI_NANG = require("./CV_KI_NANG");

Role.hasMany(User, { foreignKey: "MA_ROLE" });
User.belongsTo(Role, { foreignKey: "MA_ROLE" });

User.hasMany(Admin, { foreignKey: "SDT" });
Admin.belongsTo(User, { foreignKey: "SDT" });

User.hasMany(NguoiLaoDong, { foreignKey: "SDT" });
NguoiLaoDong.belongsTo(User, { foreignKey: "SDT" });

User.hasMany(NhaTuyenDung, { foreignKey: "SDT" });
NhaTuyenDung.belongsTo(User, { foreignKey: "SDT" });

NhaTuyenDung.belongsToMany(KiNang, {
  through: NHA_TUYEN_DUNG_KI_NANG,
  foreignKey: "MA_NTD",
  timestamps: false,
});
KiNang.belongsToMany(NhaTuyenDung, {
  through: NHA_TUYEN_DUNG_KI_NANG,
  foreignKey: "MA_KN",
  timestamps: false,
});

NhaTuyenDung.belongsToMany(LinhVuc, {
  through: NHA_TUYEN_DUNG_LINH_VUC,
  foreignKey: "MA_NTD",
  timestamps: false,
});
LinhVuc.belongsToMany(NhaTuyenDung, {
  through: NHA_TUYEN_DUNG_LINH_VUC,
  foreignKey: "MA_LV",
  timestamps: false,
});

NhaTuyenDung.hasMany(TinTuyenDung, { foreignKey: "MA_NTD" });
TinTuyenDung.belongsTo(NhaTuyenDung, {
  foreignKey: "MA_NTD",
  onDelete: "CASCADE", // Xóa tin tuyển dụng khi nhà tuyển dụng bị xóa
});

NGUOI_LAO_DONG_FOLLOW.belongsTo(NguoiLaoDong, {
  foreignKey: "MA_NLD",
  onDelete: "CASCADE",
});
NGUOI_LAO_DONG_FOLLOW.belongsTo(NhaTuyenDung, {
  foreignKey: "MA_NTD",
  onDelete: "CASCADE",
});

NhaTuyenDung.belongsToMany(NguoiLaoDong, {
  through: NGUOI_LAO_DONG_FOLLOW,
  foreignKey: "MA_NTD",
});
NguoiLaoDong.belongsToMany(NhaTuyenDung, {
  through: NGUOI_LAO_DONG_FOLLOW,
  foreignKey: "MA_NLD",
});

TinTuyenDung.belongsToMany(KiNang, {
  through: TIN_TUYEN_DUNG_KI_NANG,
  foreignKey: "MA_TTD",
  timestamps: false,
});
KiNang.belongsToMany(TinTuyenDung, {
  through: TIN_TUYEN_DUNG_KI_NANG,
  foreignKey: "MA_KN",
  timestamps: false,
});

TinTuyenDung.belongsToMany(CapBac, {
  through: TIN_TUYEN_DUNG_CAP_BAC,
  foreignKey: "MA_TTD",
  timestamps: false,
});
CapBac.belongsToMany(TinTuyenDung, {
  through: TIN_TUYEN_DUNG_CAP_BAC,
  foreignKey: "MA_CB",
  timestamps: false,
});

TinTuyenDung.hasMany(HSUngTuyen, { foreignKey: "MA_TTD" });
HSUngTuyen.belongsTo(TinTuyenDung, {
  foreignKey: "MA_TTD",
  onDelete: "CASCADE",
});

NguoiLaoDong.belongsToMany(KiNang, {
  through: NGUOI_LAO_DONG_KI_NANG,
  foreignKey: "MA_NLD",
  timestamps: false,
});
KiNang.belongsToMany(NguoiLaoDong, {
  through: NGUOI_LAO_DONG_KI_NANG,
  foreignKey: "MA_KN",
  timestamps: false,
});

NguoiLaoDong.belongsToMany(CapBac, {
  through: NGUOI_LAO_DONG_CAP_BAC,
  foreignKey: "MA_NLD",
  timestamps: false,
});

CapBac.belongsToMany(NguoiLaoDong, {
  through: NGUOI_LAO_DONG_CAP_BAC,
  foreignKey: "MA_CB",
  timestamps: false,
});

NguoiLaoDong.hasMany(CV, { foreignKey: "MA_NLD" });
CV.belongsTo(NguoiLaoDong, { foreignKey: "MA_NLD", onDelete: "CASCADE" });

HSUngTuyen.belongsTo(CV, { foreignKey: "MA_CV", onDelete: "SET NULL" });
CV.hasMany(HSUngTuyen, { foreignKey: "MA_CV" });

// CV.belongsToMany(CapBac, {
//   through: CV_CAP_BAC,
//   foreignKey: "MA_CV",
//   timestamps: false,
// });
// CapBac.belongsToMany(CV, {
//   through: CV_CAP_BAC,
//   foreignKey: "MA_CB",
//   timestamps: false,
// });

// CV.belongsToMany(KiNang, {
//   through: CV_KI_NANG,
//   foreignKey: "MA_CV",
//   timestamps: false,
// });
// KiNang.belongsToMany(CV, {
//   through: CV_KI_NANG,
//   foreignKey: "MA_KN",
//   timestamps: false,
// });

CV.hasMany(DuAn, {
  foreignKey: "MA_CV",
  onDelete: "CASCADE",
});
DuAn.belongsTo(CV, {
  foreignKey: "MA_CV",
  onDelete: "CASCADE",
});

TinTuyenDung.belongsTo(LoaiHinh, { foreignKey: "MA_LOAI_HINH" });
LoaiHinh.hasMany(TinTuyenDung, {
  foreignKey: "MA_LOAI_HINH",
  onDelete: "CASCADE",
});

TinTuyenDung.belongsTo(LoaiHopDong, { foreignKey: "MA_LOAI_HD" });
LoaiHopDong.hasMany(TinTuyenDung, {
  foreignKey: "MA_LOAI_HD",
  onDelete: "CASCADE",
});

User.hasMany(UngTuyen, { foreignKey: "SDT" });
UngTuyen.belongsTo(User, { foreignKey: "SDT" });

TinTuyenDung.hasMany(UngTuyen, { foreignKey: "MA_TTD" });
UngTuyen.belongsTo(TinTuyenDung, { foreignKey: "MA_TTD" });

User.hasMany(LuuTTD, { foreignKey: "SDT" });
LuuTTD.belongsTo(User, { foreignKey: "SDT" });

TinTuyenDung.hasMany(LuuTTD, { foreignKey: "MA_TTD" });
LuuTTD.belongsTo(TinTuyenDung, { foreignKey: "MA_TTD" });

User.hasMany(ThongBao, { foreignKey: "SDT" });

ThongBao.belongsTo(User, { foreignKey: "SDT" });
const db = {
  sequelize,
  LinhVuc,
  KiNang,
  LoaiHinh,
  LoaiHopDong,
  CapBac,
  Role,
  User,
  NguoiLaoDong,
  CV,
  DuAn,
  Admin,
  NhaTuyenDung,
  TinTuyenDung,
  HSUngTuyen,
  NGUOI_LAO_DONG_FOLLOW,
  NGUOI_LAO_DONG_KI_NANG,
  NGUOI_LAO_DONG_CAP_BAC,
  NHA_TUYEN_DUNG_KI_NANG,
  NHA_TUYEN_DUNG_LINH_VUC,
  TIN_TUYEN_DUNG_KI_NANG,
  TIN_TUYEN_DUNG_CAP_BAC,
  CV_CAP_BAC,
  CV_KI_NANG,
  UngTuyen,
  LuuTTD,
  ThongBao,
};
module.exports = db;
