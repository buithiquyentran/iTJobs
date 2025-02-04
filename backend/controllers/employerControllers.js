const { NhaTuyenDung, LinhVuc, KiNang } = require("../models");
exports.getNhaTuyenDungLinhVuc = async (req, res) => {
  const { id } = req.params;
  try {
    const nhaTuyenDung = await NhaTuyenDung.findByPk(id, {
      include: [
        {
          model: LinhVuc,
          attributes: ["TEN_LV"],
          through: { attributes: [] },
        },
      ],
    });
    if (!nhaTuyenDung) {
      return res.status(404).json({ message: "Nhà tuyển dụng không tồn tại" });
    }
    res.status(200).json({
      TEN_NTD: nhaTuyenDung.TEN_NTD,
      LINH_VUC: nhaTuyenDung.LinhVucs?.map((lv) => lv.TEN_LV) || [], // Xử lý nếu không có lĩnh vực nào
    });
  } catch (error) {
    console.error("Error fetching LINH_VUC:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy lĩnh vực của nhà tuyển dụng" });
  }
};
exports.getNhaTuyenDungKiNang = async (req, res) => {
  const { id } = req.params;
  try {
    const nhaTuyenDung = await NhaTuyenDung.findByPk(id, {
      include: [
        {
          model: KiNang,
          attributes: ["TEN_KN"],
          through: { attributes: [] },
        },
      ],
    });
    if (!nhaTuyenDung) {
      return res.status(404).json({ message: "Nhà tuyển dụng không tồn tại" });
    }
    res.status(200).json({
      TEN_NTD: nhaTuyenDung.TEN_NTD,
      KI_NANG: nhaTuyenDung.KiNangs?.map((kn) => kn.TEN_KN) || [], // Xử lý nếu không có lĩnh vực nào
    });
  } catch (error) {
    console.error("Error fetching LINH_VUC:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy lĩnh vực của nhà tuyển dụng" });
  }
};
exports.getEmployers = async (req, res) => {
  try {
    const companies = await NhaTuyenDung.findAll(); // Lấy tất cả công việc từ bảng Job
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getEmployer = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await NhaTuyenDung.findByPk(id);
    res.json(company);
  } catch (error) {
    console.error("Error fetching company", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
