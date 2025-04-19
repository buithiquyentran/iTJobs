const { LoaiHopDong } = require("../models");

class LoaiHopDongService {
  // Lấy tất cả
  async getAll() {
    try {
      return await LoaiHopDong.findAll();
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await LoaiHopDong.findByPk(id);
  }
  // Tạo mới
  async create(data) {
    try {
      return await LoaiHopDong.create(data);
    } catch (error) {
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    try {
      const document = await LoaiHopDong.findByPk(id);
      if (!document) {
        throw new Error("Không tìm thấy ");
      }
      await document.update(data);
      return document;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật : " + error.message);
    }
  }

  // Xóa
  async delete(id) {
    try {
      const document = await LoaiHopDong.findByPk(id);
      if (!document) {
        throw new Error("Không tìm thấy ");
      }
      await document.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new LoaiHopDongService();
