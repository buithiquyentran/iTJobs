const { ThongBao } = require("../models");

class ThongBaoService {
  // Lấy tất cả
  async getAll() {
    try {
      return await ThongBao.findAll();
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await ThongBao.findByPk(id);
  }
  async findByUsername(SDT) {
    return await ThongBao.findAll({ where: { SDT: SDT } });
  }
  // Tạo mới
  async create(data) {
    try {
      return await ThongBao.create(data);
    } catch (error) {
      throw new Error("Lỗi khi tạo : " + error.message);
    }
  }

  // Cập nhật
  async update(id, data) {
    try {
      const thongBao = await ThongBao.findByPk(id);
      if (!thongBao) {
        throw new Error("Không tìm thấy ");
      }
      await thongBao.update(data);
      return thongBao;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật : " + error.message);
    }
  }

  // Xóa
  async delete(id) {
    try {
      const thongBao = await ThongBao.findByPk(id);
      if (!thongBao) {
        throw new Error("Không tìm thấy ");
      }
      await thongBao.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new ThongBaoService();
