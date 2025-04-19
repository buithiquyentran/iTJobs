const { sequelize } = require("../config/db");

const TinTuyenDungService = require("../services/tinTuyenDung.service");
exports.getAll = async (req, res) => {
  try {
    const response = await TinTuyenDungService.getAll();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getOne = async (req, res) => {
  try {
    const response = await TinTuyenDungService.findById(req.params.id);
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getByMA_NTD = async (req, res) => {
  try {
    const response = await TinTuyenDungService.findByMA_NTD(req.params.MA_NTD);
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const document = await TinTuyenDungService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was updated successfully", document });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Error updating with id= ${req.params.id}`));
  }
};

exports.create = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to create can not be empty"));
  }
  try {
    const document = await TinTuyenDungService.create(req.body);

    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was created successfully", document });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Error creating with id= ${req.params.id}`));
  }
};
exports.delete = async (req, res, next) => {
  try {
    const document = await TinTuyenDungService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was deleted successfully", document });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Error deleting with id= ${req.params.id}`));
  }
};

// exports.getRecruitmentsByCompany = async (req, res) => {
//   try {
//     const { ma_ntd } = req.params;

//     const recruitments = await TinTuyenDung.findAll({
//       where: { MA_NTD: ma_ntd },
//       include: [
//         {
//           model: TinTuyenDung,
//           attributes: ["TEN_NTD", "LOGO"],
//         },
//         {
//           model: KiNang,
//           attributes: ["TEN_KN"],
//           through: { attributes: [] },
//         },
//         {
//           model: CapBac,
//           attributes: ["TEN_CB"],
//           through: { attributes: [] },
//         },
//         {
//           model: LoaiHinh, // Lấy thông tin loại hình
//           attributes: ["TEN_LOAI_HINH"],
//         },
//         {
//           model: LoaiHopDong, // Lấy thông tin loại hợp đồng
//           attributes: ["TEN_LOAI_HD"],
//         },
//       ],
//     });

//     res.status(200).json(recruitments);
//   } catch (error) {
//     console.error("Error fetching recruitment news by company:", error);
//     res.status(500).json(error);
//   }
// };
