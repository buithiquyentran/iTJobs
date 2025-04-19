const { User } = require("../models");

class UserService {
  // Lấy tất cả
  async getAll() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async getEmployers() {
    try {
      return await User.findAll({ where: { MA_ROLE: 2 } });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async getEmployees() {
    try {
      return await User.findAll({ where: { MA_ROLE: 3 } });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(id) {
    return await User.findByPk(id);
  }
  // Tạo mới
  async create(data) {
    try {
      return await User.create(data);
    } catch (error) {
      console.log(error);
      // throw new Error("Lỗi khi tạo : " + error.message);
    }
  }
  // async findBySDT(SDT) {
  //   return await User.findOne({
  //     SDT: SDT,
  //   });
  // }
  // Cập nhật
  async update(SDT, data) {
    try {
      const document = await User.findOne({
        where: {
          SDT: SDT,
        },
        data,
      });
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
  async delete(SDT) {
    try {
      const document = await User.findOne({
        where: {
          SDT: SDT,
        },
      });
      if (!document) {
        throw new Error("Không tìm  thấy ");
      }
      await document.destroy();
      return { message: "Xóa  thành công" };
    } catch (error) {
      throw new Error("Lỗi khi xóa : " + error.message);
    }
  }
}

module.exports = new UserService();
