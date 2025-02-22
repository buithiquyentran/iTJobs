const {
  sequelize,
  TinTuyenDung,
  NhaTuyenDung,
  CapBac,
  LoaiHinh,
  LoaiHopDong,
  KiNang,
  LinhVuc,
} = require("../models");
const { Op } = require("sequelize");

exports.getJobs = async (req, res) => {
  try {
    const { DIA_CHI, CAP_DO, LOAI_HINH, LOAI_HD, KEY_WORD } = req.query;

    // Định nghĩa các điều kiện tìm kiếm
    const whereCondition = {};
    const includeCondition = [];

    if (DIA_CHI && DIA_CHI.trim() !== "") {
      whereCondition.DIA_CHI = { [Op.like]: `%${DIA_CHI.trim()}%` };
    }
    // Tìm kiếm theo cấp độ (CAP_DO)
    if (CAP_DO) {
      includeCondition.push({
        model: CapBac,
        where: { TEN_CB: { [Op.like]: `%${CAP_DO}%` } },
        required: true,
      });
    }
    if (LOAI_HINH) {
      includeCondition.push({
        model: LoaiHinh,
        attributes: [],
        where: { TEN_LOAI_HINH: { [Op.like]: `%${LOAI_HINH}%` } },
        required: true,
      });
    }

    if (LOAI_HD) {
      includeCondition.push({
        model: LoaiHopDong,
        attributes: [],
        where: { TEN_LOAI_HD: { [Op.like]: `%${LOAI_HD}%` } },
        required: true,
      });
    }

    // Tìm kiếm theo từ khóa (KEY_WORD)
    if (KEY_WORD) {
      const keywordArray = KEY_WORD.split(",").map((kw) => kw.trim());
      includeCondition.push(
        {
          model: KiNang,
          where: {
            TEN_KN: {
              [Op.or]: keywordArray.map((keyword) => ({
                [Op.like]: `%${keyword}%`,
              })),
            },
          },
          required: true,
        },
        {
          model: CapBac,
          where: {
            TEN_CB: {
              [Op.or]: keywordArray.map((keyword) => ({
                [Op.like]: `%${keyword}%`,
              })),
            },
          },
          required: true,
        }
      );

      whereCondition[Op.or] = keywordArray.map((keyword) => ({
        [Op.or]: [
          { TEN_TTD: { [Op.like]: `%${keyword}%` } },
          { TRACH_NHIEM: { [Op.like]: `%${keyword}%` } },
        ],
      }));
    }

    // Thực hiện truy vấn với Sequelize
    const jobs = await TinTuyenDung.findAll({
      where: whereCondition,
      include: includeCondition,
    });

    res.json({ success: true, data: jobs.map((job) => job.MA_TTD) });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const { keyword, address } = req.query;
    const whereConditions = []; // Dùng array để chứa các điều kiện
    const includeConditions = []; // Chứa các điều kiện include

    // 📍 Tìm kiếm theo địa chỉ
    if (address && address.trim() !== "") {
      whereConditions.push({
        [Op.or]: [
          { DIA_CHI: { [Op.like]: `%${address.trim()}%` } },
          { DIA_CHI_CU_THE: { [Op.like]: `%${address.trim()}%` } },
        ],
      });
    }

    // 📍 Tìm kiếm theo từ khóa (keyword)
    if (keyword && keyword.trim() !== "") {
      whereConditions.push({
        [Op.or]: [
          { TEN_NTD: { [Op.like]: `%${keyword.trim()}%` } },
          { QUOC_TICH: { [Op.like]: `%${keyword.trim()}%` } },
        ],
      });

      includeConditions.push(
        {
          model: KiNang,
          attributes: [],
          where: {
            TEN_KN: { [Op.like]: `%${keyword.trim()}%` },
          },
          required: true, // Lấy cả khi không có kỹ năng phù hợp
        },
        {
          model: LinhVuc,
          attributes: [],
          where: {
            TEN_LV: { [Op.like]: `%${keyword.trim()}%` },
          },
          required: true, // Lấy cả khi không có lĩnh vực phù hợp
        }
      );
    }

    // 📊 Thực hiện truy vấn
    const companies = await NhaTuyenDung.findAll({
      where: whereConditions.length > 0 ? { [Op.or]: whereConditions } : {},
      include: includeConditions,
    });
    console.log(whereConditions);
    // ✅ Trả về dữ liệu
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};
