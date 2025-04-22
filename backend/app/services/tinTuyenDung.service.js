const {
  TinTuyenDung,
  CapBac,
  KiNang,
  TIN_TUYEN_DUNG_KI_NANG,
  TIN_TUYEN_DUNG_CAP_BAC,
  NhaTuyenDung,
  LoaiHopDong,
  LoaiHinh,
  NguoiLaoDong,
} = require("../models");
const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

class TinTuyenDungService {
  // Lấy tất cả
  async getAll() {
    try {
      return await TinTuyenDung.findAll({
        // where: { STATUS: 1 },
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
            model: LoaiHinh,
            attributes: ["TEN_LOAI_HINH"],
          },
          {
            model: LoaiHopDong,
            attributes: ["TEN_LOAI_HD"],
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
        order: [
          // ["createdAt", "DESC"], // Ưu tiên mới nhất
          ["MA_TTD", "DESC"], // Rồi theo ID nếu bằng thời gian
        ],
      });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async getAllTrue() {
    try {
      return await TinTuyenDung.findAll({
        where: { STATUS: 1 },
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
            model: LoaiHinh,
            attributes: ["TEN_LOAI_HINH"],
          },
          {
            model: LoaiHopDong,
            attributes: ["TEN_LOAI_HD"],
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
        order: [
          // ["createdAt", "DESC"], // Ưu tiên mới nhất
          ["MA_TTD", "DESC"], // Rồi theo ID nếu bằng thời gian
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

  // async goiY(MA_TTD) {
  //   try {
  //     // Lấy tin gốc
  //     const tinGoc = await TinTuyenDung.findByPk(MA_TTD, {
  //       include: [CapBac, KiNang],
  //     });

  //     if (!tinGoc) return null;

  //     const capBacGoc = tinGoc.CapBacs.map((cb) => cb.MA_CB);
  //     const kiNangGoc = tinGoc.KiNangs.map((kn) => kn.MA_KN);

  //     // Lấy tất cả tin khác (có cấp bậc hoặc kỹ năng trùng)
  //     const allTin = await TinTuyenDung.findAll({
  //       where: {
  //         MA_TTD: { [Op.ne]: MA_TTD },
  //       },
  //       include: [CapBac, KiNang],
  //     });

  //     // Tính điểm tương đồng cho từng tin
  //     const tinDiem = allTin.map((tin) => {
  //       const capBacKhac = tin.CapBacs.map((cb) => cb.MA_CB);
  //       const kiNangKhac = tin.KiNangs.map((kn) => kn.MA_KN);

  //       let diem = 0;

  //       // So sánh cấp bậc
  //       if (capBacKhac.some((id) => capBacGoc.includes(id))) {
  //         diem += 1;
  //       }

  //       // So sánh kỹ năng
  //       kiNangKhac.forEach((id) => {
  //         if (kiNangGoc.includes(id)) diem += 1;
  //       });

  //       return { ...tin.toJSON(), diem };
  //     });

  //     // Sắp xếp theo điểm giảm dần
  //     tinDiem.sort((a, b) => b.diem - a.diem);

  //     // Trả về 4 tin gợi ý có điểm cao nhất
  //     return tinDiem.slice(0, 4);
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  async goiY(MA_TTD) {
    try {
      // 1. Lấy tin tuyển dụng gốc
      const tinGoc = await TinTuyenDung.findByPk(MA_TTD, {
        include: [CapBac, KiNang],
      });

      if (!tinGoc) return null;

      const capBacGoc = tinGoc.CapBacs.map((cb) => cb.MA_CB);
      const kiNangGoc = tinGoc.KiNangs.map((kn) => kn.MA_KN);
      const diaChiGoc = tinGoc.DIA_CHI?.toLowerCase() || "";
      const diaChiCuTheGoc = (tinGoc.DIA_CHI_CU_THE || []).map((s) =>
        s.toLowerCase()
      );

      // 2. Lấy các tin tuyển dụng khác
      const allTin = await TinTuyenDung.findAll({
        where: {
          MA_TTD: { [Op.ne]: MA_TTD }, // loại trừ chính tin gốc
        },
        // include: [CapBac, KiNang],
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
          {
            model: NhaTuyenDung,
            attributes: [
              "TEN_NTD",
              "LOGO",
              // "LOGAN",
              // "ABOUT",
              // "QUY_MO",
              // "QUOC_TICH",
              // "DAI_NGO",
              "DIA_CHI_CU_THE",
            ],
          },
        ],
      });

      // 3. Tính điểm tương đồng
      const tinDiem = allTin.map((tin) => {
        const capBacKhac = tin.CapBacs.map((cb) => cb.MA_CB);
        const kiNangKhac = tin.KiNangs.map((kn) => kn.MA_KN);
        const diaChiKhac = tin.DIA_CHI?.toLowerCase() || "";
        const diaChiCuTheKhac = (tin.DIA_CHI_CU_THE || []).map((s) =>
          s.toLowerCase()
        );

        let diem = 0;

        // So sánh cấp bậc
        if (capBacKhac.some((id) => capBacGoc.includes(id))) diem += 1;

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

  async goiYCaNhan(MA_NLD) {
    try {
      // 1. Lấy tin tuyển dụng gốc
      const nld = await NguoiLaoDong.findByPk(MA_NLD, {
        include: [CapBac, KiNang],
      });

      if (!nld) return null;

      const capBacGoc = nld.CapBacs.map((cb) => cb.MA_CB);
      const kiNangGoc = nld.KiNangs.map((kn) => kn.MA_KN);
      const diaChiGoc = nld.QUE_QUAN?.toLowerCase() || "";

      // 2. Lấy các tin tuyển dụng khác
      const allTin = await TinTuyenDung.findAll({
        // include: [CapBac, KiNang],
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
          {
            model: NhaTuyenDung,
            attributes: [
              "TEN_NTD",
              "LOGO",
              // "LOGAN",
              // "ABOUT",
              // "QUY_MO",
              // "QUOC_TICH",
              // "DAI_NGO",
              "DIA_CHI_CU_THE",
            ],
          },
        ],
      });

      // 3. Tính điểm tương đồng
      const tinDiem = allTin.map((tin) => {
        const capBacKhac = tin.CapBacs.map((cb) => cb.MA_CB);
        const kiNangKhac = tin.KiNangs.map((kn) => kn.MA_KN);
        const diaChiKhac = tin.DIA_CHI?.toLowerCase() || "";
        const diaChiCuTheKhac = (tin.DIA_CHI_CU_THE || []).map((s) =>
          s.toLowerCase()
        );

        let diem = 0;

        // So sánh cấp bậc
        if (capBacKhac.some((id) => capBacGoc.includes(id))) diem += 1;

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
          diaChiGoc.includes(part)
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

module.exports = new TinTuyenDungService();
