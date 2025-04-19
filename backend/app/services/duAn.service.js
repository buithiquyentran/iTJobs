const { DuAn } = require("../models");

class DuAnService {
  // Lấy tất cả
  async getAll() {
    try {
      return await DuAn.findAll();
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await DuAn.findByPk(id);
  }
  // Tạo mới
  async create(data) {
    try {
      return await DuAn.create(data);
    } catch (error) {
      console.log(error);
      // throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    try {
      const duAn = await DuAn.findByPk(id);
      if (!duAn) {
        throw new Error("Không tìm thấy ");
      }
      await duAn.update(data);
      return duAn;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật : " + error.message);
    }
  }

  // Xóa
  async delete(id) {
    try {
      const duAn = await DuAn.findByPk(id);
      if (!duAn) {
        throw new Error("Không tìm thấy ");
      }
      await duAn.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new DuAnService();
