const { sequelize } = require("../config/db");

const NhaTuyenDungService = require("../services/nhaTuyenDung.service");
exports.getAll = async (req, res) => {
  try {
    const response = await NhaTuyenDungService.getAll();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getAllStatus = async (req, res) => {
  try {
    const response = await NhaTuyenDungService.getAllStatus();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getOne = async (req, res) => {
  try {
    const response = await NhaTuyenDungService.findById(req.params.id);
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
    const document = await NhaTuyenDungService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was updated successfully", document });
  } catch (error) {
    console.error(error);
    // return next(new ApiError(500, `Error updating with id= ${req.params.id}`));
  }
};

exports.create = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to create can not be empty"));
  }
  try {
    const document = await NhaTuyenDungService.create(req.body);

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
    const document = await NhaTuyenDungService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was deleted successfully", document });
  } catch (error) {
    console.error(error);
    // return next(new ApiError(500, `Error deleting with id= ${req.params.id}`));
  }
};
exports.goiY = async (req, res, next) => {
  try {
    const document = await NhaTuyenDungService.goiY(req.params.MA_NTD);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send(document);
  } catch (error) {
    console.error(error);
    // return next(new ApiError(500, `Error deleting with id= ${req.params.id}`));
  }
};
