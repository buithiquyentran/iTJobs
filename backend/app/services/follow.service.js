const { NGUOI_LAO_DONG_FOLLOW } = require("../models");

class FollowService {
  // Lấy tất cả
  async getAll() {
    try {
      return await NGUOI_LAO_DONG_FOLLOW.findAll();
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(maNld, maNtd) {
    return await NGUOI_LAO_DONG_FOLLOW.findOne({
      where: {
        MA_NLD: maNld,
        MA_NTD: maNtd,
      },
    });
  }
  async findByUserName(maNld) {
    return await NGUOI_LAO_DONG_FOLLOW.findAll({ where: { MA_NLD: maNld } });
  }
  // Tạo mới
  async create(data) {
    try {
      return await NGUOI_LAO_DONG_FOLLOW.create(data);
    } catch (error) {
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // // Cập nhật
  // async update(maNld, maNtd) {
  //   try {
  //     const follow = await NGUOI_LAO_DONG_FOLLOW.findOne({
  //       where: {
  //         MA_NLD: maNld,
  //         MA_NTD: maNtd,
  //       },
  //     });
  //     if (!follow) {
  //       throw new Error("Không tìm thấy ");
  //     }
  //     await follow.update(data);
  //     return follow;
  //   } catch (error) {
  //     throw new Error("Lỗi khi cập nhật : " + error.message);
  //   }
  // }

  // Xóa
  async delete(maNld, maNtd) {
    try {
      const follow = await NGUOI_LAO_DONG_FOLLOW.findOne({
        where: {
          MA_NLD: maNld,
          MA_NTD: maNtd,
        },
      });
      if (!follow) {
        throw new Error("Không tìm thấy ");
      }
      await follow.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new FollowService();
