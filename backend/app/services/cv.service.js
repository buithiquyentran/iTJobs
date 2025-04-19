const {
  CV,
  CV_KI_NANG,
  CV_CAP_BAC,
  CapBac,
  KiNang,
  NguoiLaoDong,
  DuAn,
} = require("../models");
const { sequelize } = require("../config/db");

class CVService {
  // Lấy tất cả
  async getAll() {
    try {
      return await CV.findAll({
        include: [
          // {
          //   model: CapBac,
          //   attributes: ["MA_CB", "TEN_CB"],
          // },
          // {
          //   model: KiNang,
          //   attributes: ["MA_KN", "TEN_KN"],
          // },
          {
            model: NguoiLaoDong,
            // attributes: ["MA_KN", "TEN_KN"],
          },
          {
            model: DuAn,
            // attributes: ["MA_KN", "TEN_KN"],
          },
        ],
      });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await CV.findByPk(id, {
      include: [
        {
          model: NguoiLaoDong,
          // attributes: ["MA_KN", "TEN_KN"],
        },
        {
          model: DuAn,
          // attributes: ["MA_KN", "TEN_KN"],
        },
      ],
    });
  }
  // find by MA_NLD
  async findByMA_NLD(MA_NLD) {
    return await CV.findAll({
      where: {
        MA_NLD: MA_NLD,
      },

      include: [
        {
          model: NguoiLaoDong,
          // attributes: ["MA_KN", "TEN_KN"],
        },
        {
          model: DuAn,
          // attributes: ["MA_KN", "TEN_KN"],
        },
      ],
    });
  }
  // Tạo mới
  async create(data) {
    // const t = await sequelize.transaction();

    try {
      return await CV.create(data);
    } catch (error) {
      console.log(error);
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    try {
      const cv = await CV.findByPk(id);
      if (!cv) {
        throw new Error("Không tìm thấy ");
      }
      await cv.update(data);
      return cv;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật : " + error.message);
    }
  }

  // Xóa
  async delete(id) {
    try {
      const cv = await CV.findByPk(id);
      if (!cv) {
        throw new Error("Không tìm thấy ");
      }
      await cv.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new CVService();
