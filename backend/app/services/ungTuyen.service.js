const { UngTuyen, TinTuyenDung } = require("../models");

class UngTuyenService {
  // Lấy tất cả
  async getAll() {
    try {
      return await UngTuyen.findAll({
        // include: [
        //   {
        //     model: TinTuyenDung,
        //     // attributes: ["MA_CB", "TEN_CB"],
        //   },
        // ],
      });
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
  }
  async findById(sdt, maTtd) {
    return await UngTuyen.findOne({
      where: {
        SDT: sdt,
        MA_TTD: maTtd,
      },
      // include: [
      //   {
      //     model: TinTuyenDung,
      //     // attributes: ["MA_CB", "TEN_CB"],
      //   },
      // ],
    });
  }
  // Tạo mới
  async create(data) {
    try {
      return await UngTuyen.create(data);
    } catch (error) {
      console.log(error);
      // throw new Error("Lỗi khi tạo : " + error.message);
    }
  }
  // // Cập nhật
  async update(sdt, maTtd, data) {
    try {
      const ungTuyen = await UngTuyen.findOne({
        where: {
          SDT: sdt,
          MA_TTD: maTtd,
        },
      });
      if (!ungTuyen) {
        throw new Error("Không tìm thấy ");
      }
      await ungTuyen.update(data);
      return ungTuyen;
    } catch (error) {
      console.log(error);
      // throw new Error("Lỗi khi cập nhật : " + error.message);
    }
  }
  async delete(sdt, maTtd) {
    try {
      const follow = await UngTuyen.findOne({
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
  async findByUserName(sdt) {
    return await UngTuyen.findAll({ where: { SDT: sdt } });
  }
  
  async findByMA_NTD(MA_NTD) {
    return await UngTuyen.findAll({
      include: [
        {
          model: TinTuyenDung,
          attributes: ["MA_TTD", "MA_NTD", "TEN_TTD"],
          where: {
            MA_NTD: MA_NTD,
          },
        },
      ],
    });
  }
}

module.exports = new UngTuyenService();
