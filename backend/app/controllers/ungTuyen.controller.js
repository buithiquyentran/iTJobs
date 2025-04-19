const ApiError = require("../api-error");

const UngTuyenService = require("../services/ungTuyen.service");
exports.getAll = async (req, res) => {
  try {
    const response = await UngTuyenService.getAll();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getOne = async (req, res) => {
  try {
    const { sdt, maTtd } = req.params;
    const response = await UngTuyenService.findById(sdt, maTtd);
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getByUsername = async (req, res) => {
  try {
    const { sdt } = req.params;
    const response = await UngTuyenService.findByUserName(sdt);
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getByMA_NTD = async (req, res) => {
  try {
    const { MA_NTD } = req.params;
    const response = await UngTuyenService.findByMA_NTD(MA_NTD);
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
    const { sdt, maTtd } = req.params;

    const document = await UngTuyenService.update(sdt, maTtd, req.body);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was updated successfully", document });
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, `Error updating with username= ${req.params.sdt}`)
    );
  }
};
exports.create = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to create can not be empty"));
  }
  try {
    const document = await UngTuyenService.create(req.body);
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
    const { sdt, maTtd } = req.params;

    const document = await UngTuyenService.delete(sdt, maTtd);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was deleted successfully", document });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Error deleting with id= ${req.params.id}`));
  }
};
