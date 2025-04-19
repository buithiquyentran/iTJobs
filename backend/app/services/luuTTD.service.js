const { LuuTTD } = require("../models");

class LuuTTDService {
  // Lấy tất cả
  async getAll() {
    try {
      return await LuuTTD.findAll();
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(sdt, maTtd) {
    return await LuuTTD.findOne({
      where: {
        SDT: sdt,
        MA_TTD: maTtd,
      },
    });
  }
  async findByUserName(sdt) {
    return await LuuTTD.findAll({ where: { SDT: sdt } });
  }
  // Tạo mới
  async create(data) {
    try {
      return await LuuTTD.create(data);
    } catch (error) {
      console.log(error);
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  async delete(sdt, maTtd) {
    try {
      const follow = await LuuTTD.findOne({
        where: {
          SDT: sdt,
          MA_TTD: maTtd,
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

module.exports = new LuuTTDService();
