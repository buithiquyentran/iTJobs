const {
  NguoiLaoDong,
  CapBac,
  KiNang,
  NGUOI_LAO_DONG_FOLLOW,
  NGUOI_LAO_DONG_CAP_BAC,
  NGUOI_LAO_DONG_KI_NANG,
  User,
} = require("../models");
const { sequelize } = require("../config/db");

class NguoiLaoDongService {
  // Lấy tất cả
  async getAll() {
    try {
      return await NguoiLaoDong.findAll({
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
            model: User,
          },
        ],
      });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await NguoiLaoDong.findByPk(id, {
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
          model: User,
        },
      ],
    });
  }
  // Tạo mới
  async create(data) {
    const t = await sequelize.transaction();
    try {
      const newWorker = await NguoiLaoDong.create(data, { transaction: t });
      if (!newWorker) {
        await t.rollback();
        throw new Error("Không thể tạo người lao động");
      }
      const MA_NLD = newWorker.MA_NLD;
      const { MA_KN, MA_CB } = data;

      // Thêm cấp bậc vào bảng NGUOI_LAO_DONG_KI_NANG
      if (MA_KN && Array.isArray(MA_KN)) {
        const skillsData = MA_KN.map((MA_KN) => ({ MA_NLD, MA_KN }));
        await NGUOI_LAO_DONG_KI_NANG.bulkCreate(skillsData, { transaction: t });
      }
      // Thêm cấp bậc vào bảng NGUOI_LAO_DONG_CAP_BAC
      if (MA_CB && Array.isArray(MA_CB)) {
        const levelsData = MA_CB.map((MA_CB) => ({ MA_NLD, MA_CB }));
        await NGUOI_LAO_DONG_CAP_BAC.bulkCreate(levelsData, { transaction: t });
      }
      await t.commit(); // Lưu thay đổi nếu không có lỗi

      return this.findById(MA_NLD);
    } catch (error) {
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    const t = await sequelize.transaction();
    try {
      // Tìm người lao động cần cập nhật
      const nguoiLaoDong = await NguoiLaoDong.findByPk(id);
      if (!nguoiLaoDong) {
        await t.rollback();
        throw new Error("Không tìm thấy người lao động");
      }

      // Cập nhật thông tin người lao động
      await nguoiLaoDong.update(data, { transaction: t });

      const { MA_KN, MA_CB } = data;

      // Xóa các kỹ năng cũ trong bảng NGUOI_LAO_DONG_KI_NANG
      await NGUOI_LAO_DONG_KI_NANG.destroy({
        where: { MA_NLD: id },
        transaction: t,
      });
 
      // Nếu có kỹ năng mới, thêm vào
      if (MA_KN && Array.isArray(MA_KN)) {
        const fieldsData = MA_KN.map((MA_KN) => ({ MA_NLD: id, MA_KN }));
        await NGUOI_LAO_DONG_KI_NANG.bulkCreate(fieldsData, { transaction: t });
      }

      // Xóa các cấp bậc cũ trong bảng NGUOI_LAO_DONG_CAP_BAC
      await NGUOI_LAO_DONG_CAP_BAC.destroy({
        where: { MA_NLD: id },
        transaction: t,
      });

      // Nếu có cấp bậc mới, thêm vào
      if (MA_CB && Array.isArray(MA_CB)) {
        const levelsData = MA_CB.map((MA_CB) => ({ MA_NLD: id, MA_CB }));
        await NGUOI_LAO_DONG_CAP_BAC.bulkCreate(levelsData, { transaction: t });
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
      const nguoiLaoDong = await NguoiLaoDong.findByPk(id);
      if (!nguoiLaoDong) {
        throw new Error("Không tìm thấy ");
      }
      await nguoiLaoDong.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
  async findBySDT(SDT) {
    return await NguoiLaoDong.findOne({
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
}

module.exports = new NguoiLaoDongService();
