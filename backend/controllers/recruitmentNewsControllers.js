const { sequelize, LinhVuc, CapBac } = require("../models");
const { TinTuyenDung, NhaTuyenDung, KiNang } = require("../models");
exports.getRecruitments = async (req, res) => {
  try {
    // const [rows] = await sequelize.query("SELECT * FROM TIN_TUYEN_DUNG");
    // res.status(200).json(rows);
    const jobs = await TinTuyenDung.findAll(); // Lấy tất cả công việc từ bảng Job
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching recruitment news", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getRecruitment = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await TinTuyenDung.findByPk(id); // Lấy tất cả công việc từ bảng Job
    res.json(job);
  } catch (error) {
    console.error("Error fetching recruitment news", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getTinTuyenDungKiNang = async (req, res) => {
  const { id } = req.params;
  try {
    const tintuyendung = await TinTuyenDung.findByPk(id, {
      include: {
        model: KiNang,
        attributes: ["TEN_KN"],
        through: { attributes: [] },
      },
    });
    if (!tintuyendung) {
      res.status(404).json("Tin tuyen dung khong ton tai");
    }
    res.status(200).json({
      MA_TTD: tintuyendung.MA_TTD,
      KI_NANG: tintuyendung.KiNangs.map((kn) => kn.TEN_KN || []),
    });
  } catch (error) {
    console.error("Error fetching data, ", error);
    res.status(500).json("Error fetching data");
  }
};
// getTinTuyenDungCapBac
exports.getTinTuyenDungCapBac = async (req, res) => {
  const { id } = req.params;
  try {
    const tintuyendung = await TinTuyenDung.findByPk(id, {
      include: {
        model: CapBac,
        attributes: ["TEN_CB"],
        through: { attributes: [] },
      },
    });
    if (!tintuyendung) {
      res.status(404).json("Tin tuyen dung khong ton tai");
    }
    res.status(200).json({
      MA_TTD: tintuyendung.MA_TTD,
      CAP_BAC: tintuyendung.CapBacs.map((cb) => cb.TEN_CB || []),
    });
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json("Error fetching data");
  }
};
exports.getRecruitmentWithCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const whereCondition = id ? { MA_TTD: id } : {};
    const tintuyendung = await TinTuyenDung.findAll({
      where: whereCondition,
      include: [
        {
          model: NhaTuyenDung,
          attributes: ["TEN_NTD", "LOGO"],
        },
        {
          model: KiNang,
          attributes: ["TEN_KN"],
          through: { attributes: [] },
        },
        {
          model: CapBac,
          attributes: ["TEN_CB"],
          through: { attributes: [] },
        },
      ],
    });
    // console.log("Dữ liệu trả về:", JSON.stringify(tintuyendung, null, 2));
    res.status(200).json(tintuyendung);
  } catch (error) {
    console.error("Error fetching recruitment news with company info:", error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu" });
  }
};

exports.getRecruitmentsByCompany = async (req, res) => {
  try {
    const { ma_ntd } = req.params; 

    const recruitments = await TinTuyenDung.findAll({
      where: { MA_NTD: ma_ntd }, 
      include: [
        {
          model: NhaTuyenDung,
          attributes: ["TEN_NTD", "LOGO"],
        },
        {
          model: KiNang,
          attributes: ["TEN_KN"],
          through: { attributes: [] },
        },
        {
          model: CapBac,
          attributes: ["TEN_CB"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(recruitments);
  } catch (error) {
    console.error("Error fetching recruitment news by company:", error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu" });
  }
};

