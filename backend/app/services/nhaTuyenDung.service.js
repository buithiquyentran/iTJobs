const {
  NhaTuyenDung,
  LinhVuc,
  KiNang,
  NHA_TUYEN_DUNG_LINH_VUC,
  NHA_TUYEN_DUNG_KI_NANG,
  User,
} = require("../models");
const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

class NhaTuyenDungService {
  // Lấy tất cả
  async getAll() {
    try {
      return await NhaTuyenDung.findAll({
        // where: { APPROVAL_STATUS: "approved" },
        include: [
          {
            model: LinhVuc,
            attributes: ["MA_LV", "TEN_LV"],
          },
          {
            model: KiNang,
            attributes: ["MA_KN", "TEN_KN"],
          },
          {
            model: User,
            // attributes: ["MA_KN", "TEN_KN"],
          },
        ],
      });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async getAllStatus() {
    try {
      return await NhaTuyenDung.findAll({
        include: [
          {
            model: LinhVuc,
            attributes: ["MA_LV", "TEN_LV"],
          },
          {
            model: KiNang,
            attributes: ["MA_KN", "TEN_KN"],
          },
          {
            model: User,
            // attributes: ["MA_KN", "TEN_KN"],
            where: {
              APPROVAL_STATUS: "approved", // Đặt đúng ở đây
            },
          },
        ],
      });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await NhaTuyenDung.findByPk(id, {
      include: [
        {
          model: LinhVuc,
          attributes: ["MA_LV", "TEN_LV"],
        },
        {
          model: KiNang,
          attributes: ["MA_KN", "TEN_KN"],
        },
      ],
    });
  }
  // Tạo mới
  async create(data) {
    const t = await sequelize.transaction();
    try {
      const newEmployer = await NhaTuyenDung.create(data, { transaction: t });
      if (!newEmployer) {
        await t.rollback();
        throw new Error("Không thể tạo nhà tuyển dụng");
      }
      const MA_NTD = newEmployer.MA_NTD;
      const { MA_KN, MA_LV } = data;

      // Thêm cấp bậc vào bảng NHA_TUYEN_DUNG_KI_NANG
      if (MA_KN && Array.isArray(MA_KN)) {
        const fieldsData = MA_KN.map((MA_KN) => ({ MA_NTD, MA_KN }));
        await NHA_TUYEN_DUNG_KI_NANG.bulkCreate(fieldsData, { transaction: t });
      }
      // Thêm cấp bậc vào bảng NHA_TUYEN_DUNG_LINH_VUC
      if (MA_LV && Array.isArray(MA_LV)) {
        const levelsData = MA_LV.map((MA_LV) => ({ MA_NTD, MA_LV }));
        await NHA_TUYEN_DUNG_LINH_VUC.bulkCreate(levelsData, {
          transaction: t,
        });
      }
      await t.commit(); // Lưu thay đổi nếu không có lỗi

      return this.findById(MA_NTD);
    } catch (error) {
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    const t = await sequelize.transaction();
    try {
      // Tìm nhà tuyển dụng cần cập nhật
      const nhaTuyenDung = await NhaTuyenDung.findByPk(id);
      if (!nhaTuyenDung) {
        await t.rollback();
        throw new Error("Không tìm thấy nhà tuyển dụng");
      }

      // Cập nhật thông tin nhà tuyển dụng
      await nhaTuyenDung.update(data, { transaction: t });

      const { MA_KN, MA_LV } = data;
      // Xóa các kỹ năng cũ trong bảng NHA_TUYEN_DUNG_KI_NANG
      await NHA_TUYEN_DUNG_KI_NANG.destroy({
        where: { MA_NTD: id },
        transaction: t,
      });

      // Nếu có kỹ năng mới, thêm vào
      if (MA_KN && Array.isArray(MA_KN)) {
        const fieldsData = MA_KN.map((MA_KN) => ({ MA_NTD: id, MA_KN }));
        await NHA_TUYEN_DUNG_KI_NANG.bulkCreate(fieldsData, { transaction: t });
      }

      // Xóa các cấp bậc cũ trong bảng NHA_TUYEN_DUNG_LINH_VUC
      await NHA_TUYEN_DUNG_LINH_VUC.destroy({
        where: { MA_NTD: id },
        transaction: t,
      });

      // Nếu có cấp bậc mới, thêm vào
      if (MA_LV && Array.isArray(MA_LV)) {
        const levelsData = MA_LV.map((MA_LV) => ({ MA_NTD: id, MA_LV }));
        await NHA_TUYEN_DUNG_LINH_VUC.bulkCreate(levelsData, {
          transaction: t,
        });
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
      const nhaTuyenDung = await NhaTuyenDung.findByPk(id);
      if (!nhaTuyenDung) {
        throw new Error("Không tìm thấy ");
      }
      await nhaTuyenDung.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
  async findBySDT(SDT) {
    return await NhaTuyenDung.findOne({
      where: {
        SDT: SDT,
      },

      include: [
        {
          model: User,
        },
      ],
    });
  }

  async goiY(MA_NTD) {
    try {
      // 1. Lấy tin tuyển dụng gốc
      const ntdGoc = await NhaTuyenDung.findByPk(MA_NTD, {
        include: [LinhVuc, KiNang],
      });

      if (!ntdGoc) return null;

      const linhVucGoc = ntdGoc.LinhVucs.map((cb) => cb.MA_LV);
      const kiNangGoc = ntdGoc.KiNangs.map((kn) => kn.MA_KN);
      const diaChiGoc = ntdGoc.DIA_CHI?.toLowerCase() || "";
      const diaChiCuTheGoc = (ntdGoc.DIA_CHI_CU_THE || []).map((s) =>
        s.toLowerCase()
      );

      // 2. Lấy các tin tuyển dụng khác
      const allNtd = await NhaTuyenDung.findAll({
        where: {
          MA_NTD: { [Op.ne]: MA_NTD }, // loại trừ chính tin gốc
        },
        // include: [CapBac, KiNang],
        attributes: ["MA_NTD", "TEN_NTD", "DIA_CHI", "LOGAN", "LOGO"],
        include: [
          {
            model: LinhVuc,
            attributes: ["MA_LV", "TEN_LV"],
            through: { attributes: [] },
          },
          {
            model: KiNang,
            attributes: ["MA_KN", "TEN_KN"],
            through: { attributes: [] },
          },
        ],
      });

      // 3. Tính điểm tương đồng
      const tinDiem = allNtd.map((tin) => {
        const linhVucKhac = tin.LinhVucs.map((cb) => cb.MA_LV);
        const kiNangKhac = tin.KiNangs.map((kn) => kn.MA_KN);
        const diaChiKhac = tin.DIA_CHI?.toLowerCase() || "";
        const diaChiCuTheKhac = (tin.DIA_CHI_CU_THE || []).map((s) =>
          s.toLowerCase()
        );

        let diem = 0;

        // So sánh cấp bậc
        if (linhVucKhac.some((id) => linhVucGoc.includes(id))) diem += 1;

        // So sánh kỹ năng
        kiNangKhac.forEach((id) => {
          if (kiNangGoc.includes(id)) diem += 1;
        });

        // So sánh địa chỉ (gần giống)
        if (
          diaChiGoc &&
          diaChiKhac &&
          (diaChiKhac.includes(diaChiGoc) || diaChiGoc.includes(diaChiKhac))
        ) {
          diem += 1;
        }

        // So sánh địa chỉ cụ thể (từng thành phần mảng)
        const giongCuThe = diaChiCuTheKhac.some((part) =>
          diaChiCuTheGoc.includes(part)
        );
        if (giongCuThe) diem += 1;

        return { ...tin.toJSON(), diem };
      });

      // 4. Sắp xếp theo điểm, lấy top 4
      tinDiem.sort((a, b) => b.diem - a.diem);

      return tinDiem.slice(0, 4);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new NhaTuyenDungService();
