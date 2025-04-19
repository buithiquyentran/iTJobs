require("dotenv").config(); // Load biến môi trường từ .env
const { sequelize } = require("../config/db");
const path = require("path");
class UploadService {
  async uploadImage(MA_NTD, type, filename) {
    if (!filename) {
      throw new Error("Chưa upload file");
    }

    const imageUrl = `/uploads/${filename}`;
    const column = type === "LOGO" ? "LOGO" : "IMG";

    try {
      await sequelize.query(
        `UPDATE NHA_TUYEN_DUNG SET ${column} = :imageUrl WHERE MA_NTD = :MA_NTD`,
        {
          replacements: { imageUrl, MA_NTD },
          type: sequelize.QueryTypes.UPDATE,
        }
      );

      return {
        message: "Upload thành công",
        url: `${process.env.BASE_URL}${imageUrl}`, // Lấy từ biến môi trường
      };
    } catch (error) {
      throw new Error("Lỗi upload ảnh: " + error.message);
    }
  }

  // async upload_CV(SDT, MA_TTD, filename) {
  //   if (!filename) {
  //     throw new Error("Chưa upload file");
  //   }

  //   const Url = `/uploads/${filename}`;
  //   // console.log("REPLACEMENTS:", { Url, SDT, MA_TTD });

  //   try {
  //     await sequelize.query(
  //       `UPDATE UNG_TUYEN SET CV_LINK = :Url WHERE SDT = :SDT and MA_TTD = :MA_TTD`,
  //       {
  //         replacements: { Url, SDT, MA_TTD },
  //         type: sequelize.QueryTypes.UPDATE,
  //       }
  //     );

  //     return {
  //       message: "Upload thành công",
  //       url: `${process.env.BASE_URL}${Url}`, // Lấy từ biến môi trường
  //     };
  //   } catch (error) {
  //     throw new Error("Lỗi upload cv: " + error.message);
  //   }
  // }

  async upload_CV(MA_NLD, originalname, filename) {
    if (!filename) {
      throw new Error("Chưa upload file");
    }

    // Tạo đường dẫn URL
    const Url = `/uploads/${filename}`;

    // Lấy tên file gốc không có phần mở rộng (vd: MyCV từ MyCV.pdf)
    // const baseFileName = path.parse(filename).name;
    // console.log(baseFileName);
    try {
      // Lấy dữ liệu cũ
      const [results] = await sequelize.query(
        `SELECT CV_LINK FROM NGUOI_LAO_DONG WHERE MA_NLD = :MA_NLD`,
        {
          replacements: { MA_NLD },
          type: sequelize.QueryTypes.SELECT,
        }
      );
      console.log(results.CV_LINK);
      let currentCVs = results.CV_LINK;

      if (results) {
        try {
          currentCVs = JSON.parse(results);
        } catch (err) {
          console.error("Lỗi parse CV_LINK cũ:", err.message);
        }
      }

      // Tạo CV mới
      const newCV = {
        TEN_CV: originalname,
        CV_LINK: `${process.env.BASE_URL}${Url}`,
      };
      if (!currentCVs) currentCVs = [];
      const updatedCVs = [...currentCVs, newCV];

      await sequelize.query(
        `UPDATE NGUOI_LAO_DONG SET CV_LINK = :CV_LINK WHERE MA_NLD = :MA_NLD`,
        {
          replacements: {
            CV_LINK: JSON.stringify(updatedCVs),
            MA_NLD,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      );

      return {
        newCV,
      };
    } catch (error) {
      throw new Error("Lỗi upload cv: " + error.message);
    }
  }
}

module.exports = new UploadService();
