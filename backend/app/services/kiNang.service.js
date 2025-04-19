const { KiNang } = require("../models");

class KiNangService {
  // Lấy tất cả
  async getAll() {
    try {
      return await KiNang.findAll();
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await KiNang.findByPk(id); // ✅ Sử dụng findByPk thay vì findOne
  }
  // Tạo mới
  async create(data) {
    try {
      return await KiNang.create(data);
    } catch (error) {
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    try {
      const kiNang = await KiNang.findByPk(id);
      if (!kiNang) {
        throw new Error("Không tìm thấy ");
      }
      await kiNang.update(data);
      return kiNang;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật : " + error.message);
    }
  }

  // Xóa
  async delete(id) {
    try {
      const kiNang = await KiNang.findByPk(id);
      if (!kiNang) {
        throw new Error("Không tìm thấy ");
      }
      await kiNang.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new KiNangService();
