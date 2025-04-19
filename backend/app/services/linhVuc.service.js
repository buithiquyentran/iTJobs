const { LinhVuc } = require("../models");

class LinhVucService {
  // Lấy tất cả
  async getAll() {
    try {
      return await LinhVuc.findAll();
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await LinhVuc.findByPk(id);
  }
  // Tạo mới
  async create(data) {
    try {
      return await LinhVuc.create(data);
    } catch (error) {
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    try {
      const capBac = await LinhVuc.findByPk(id);
      if (!capBac) {
        throw new Error("Không tìm thấy ");
      }
      await capBac.update(data);
      return capBac;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật : " + error.message);
    }
  }

  // Xóa
  async delete(id) {
    try {
      const capBac = await LinhVuc.findByPk(id);
      if (!capBac) {
        throw new Error("Không tìm thấy ");
      }
      await capBac.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new LinhVucService();
