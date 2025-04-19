const {
  TinTuyenDung,
  CapBac,
  KiNang,
  TIN_TUYEN_DUNG_KI_NANG,
  TIN_TUYEN_DUNG_CAP_BAC,
  NhaTuyenDung,
  LoaiHopDong,
  LoaiHinh,
} = require("../models");
const { sequelize } = require("../config/db");

class TinTuyenDungService {
  // Lấy tất cả
  async getAll() {
    try {
      return await TinTuyenDung.findAll({
        include: [
          {
            model: CapBac,
            attributes: ["MA_CB", "TEN_CB"],
          },
          {
            model: KiNang,
            attributes: ["MA_KN", "TEN_KN"],
          },
          {
            model: NhaTuyenDung,
            attributes: [
              "TEN_NTD",
              "LOGO",
              "LOGAN",
              "ABOUT",
              "QUY_MO",
              "QUOC_TICH",
              "DAI_NGO",
              "DIA_CHI_CU_THE",
            ],
          },
        ],
      });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await TinTuyenDung.findByPk(id, {
      include: [
        {
          model: CapBac,
          attributes: ["MA_CB", "TEN_CB"],
        },
        {
          model: KiNang,
          attributes: ["MA_KN", "TEN_KN"],
        },
        {
          model: NhaTuyenDung,
          attributes: [
            "TEN_NTD",
            "LOGO",
            "LOGAN",
            "ABOUT",
            "QUY_MO",
            "QUOC_TICH",
            "DAI_NGO",
            "DIA_CHI_CU_THE",
          ],
        },
      ],
    });
  }
  // getByMA_NTD;
  async findByMA_NTD(MA_NTD) {
    return await TinTuyenDung.findAll({
      where: { MA_NTD: MA_NTD },
      include: [
        {
          model: CapBac,
          attributes: ["MA_CB", "TEN_CB"],
        },
        {
          model: KiNang,
          attributes: ["MA_KN", "TEN_KN"],
        },
        {
          model: LoaiHopDong,
          attributes: ["MA_LOAI_HD", "TEN_LOAI_HD"],
        },
        {
          model: LoaiHinh,
          attributes: ["MA_LOAI_HINH", "TEN_LOAI_HINH"],
        },
        // {
        //   model: NhaTuyenDung,
        //   attributes: [
        //     "TEN_NTD",
        //     "LOGO",
        //     "LOGAN",
        //     "ABOUT",
        //     "QUY_MO",
        //     "QUOC_TICH",
        //     "DAI_NGO",
        //     "DIA_CHI_CU_THE",
        //   ],
        // },
      ],
    });
  }
  // Tạo mới
  async create(data) {
    const t = await sequelize.transaction();
    try {
      const newEmployer = await TinTuyenDung.create(data, { transaction: t });
      if (!newEmployer) {
        await t.rollback();
        throw new Error("Không thể tạo nhà tuyển dụng");
      }
      const MA_TTD = newEmployer.MA_TTD;
      const { MA_KN, MA_CB } = data;

      // Thêm cấp bậc vào bảng TIN_TUYEN_DUNG_KI_NANG
      if (MA_KN && Array.isArray(MA_KN)) {
        const fieldsData = MA_KN.map((MA_KN) => ({ MA_TTD, MA_KN }));
        await TIN_TUYEN_DUNG_KI_NANG.bulkCreate(fieldsData, { transaction: t });
      }
      // Thêm cấp bậc vào bảng TIN_TUYEN_DUNG_CAP_BAC
      if (MA_CB && Array.isArray(MA_CB)) {
        const levelsData = MA_CB.map((MA_CB) => ({ MA_TTD, MA_CB }));
        await TIN_TUYEN_DUNG_CAP_BAC.bulkCreate(levelsData, {
          transaction: t,
        });
      }
      await t.commit(); // Lưu thay đổi nếu không có lỗi

      return this.findById(MA_TTD);
    } catch (error) {
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    const t = await sequelize.transaction();
    try {
      // Tìm tin tuyển dụng cần cập nhật
      const recruitment = await TinTuyenDung.findByPk(id);
      if (!recruitment) {
        await t.rollback();
        throw new Error("Không tìm thấy tin tuyển dụng");
      }

      // Cập nhật thông tin tin tuyển dụng
      await recruitment.update(data, { transaction: t });

      const { MA_KN, MA_CB } = data;

      // Xóa các kỹ năng cũ trong bảng TIN_TUYEN_DUNG_KI_NANG
      await TIN_TUYEN_DUNG_KI_NANG.destroy({
        where: { MA_TTD: id },
        transaction: t,
      });

      // Nếu có kỹ năng mới, thêm vào
      if (MA_KN && Array.isArray(MA_KN)) {
        const fieldsData = MA_KN.map((MA_KN) => ({ MA_TTD: id, MA_KN }));
        await TIN_TUYEN_DUNG_KI_NANG.bulkCreate(fieldsData, { transaction: t });
      }

      // Xóa các cấp bậc cũ trong bảng TIN_TUYEN_DUNG_CAP_BAC
      await TIN_TUYEN_DUNG_CAP_BAC.destroy({
        where: { MA_TTD: id },
        transaction: t,
      });

      // Nếu có cấp bậc mới, thêm vào
      if (MA_CB && Array.isArray(MA_CB)) {
        const levelsData = MA_CB.map((MA_CB) => ({ MA_TTD: id, MA_CB }));
        await TIN_TUYEN_DUNG_CAP_BAC.bulkCreate(levelsData, { transaction: t });
      }

      await t.commit(); // Lưu thay đổi nếu không có lỗi
      return this.findById(id);
    } catch (error) {
      await t.rollback();
      throw new Error("Lỗi khi cập nhật: " + error.message);
    }
  }

  // Xóa
  async delete(id) {
    try {
      const nhaTuyenDung = await TinTuyenDung.findByPk(id);
      if (!nhaTuyenDung) {
        throw new Error("Không tìm thấy ");
      }
      await nhaTuyenDung.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new TinTuyenDungService();
