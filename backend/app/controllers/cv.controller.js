const CVService = require("../services/cv.service");
const NguoiLaoDongService = require("../services/nguoiLaoDong.service");
exports.getAll = async (req, res) => {
  try {
    const response = await CVService.getAll();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getOne = async (req, res) => {
  try {
    const SDT = req.user.SDT;
    const nld = await NguoiLaoDongService.findBySDT(SDT);
    const cv = await CVService.findById(req.params.id);
    if (!cv) {
      return res.status(404).json({ message: "CV không tồn tại" });
    }
    if (cv.MA_NLD !== nld?.MA_NLD) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền truy cập CV này" });
    }
    res.json(cv);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.findByMA_NLD = async (req, res) => {
  try {
    const response = await CVService.findByMA_NLD(req.params.MA_NLD);
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
    const document = await CVService.update(req.params.id, req.body);
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
    const document = await CVService.create(req.body);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    res.json(document);
    // return res.send({ message: "Enity was created successfully", document });
  } catch (error) {
    console.error(error);

    // return next(new ApiError(500, `Error creating `));
  }
};
exports.delete = async (req, res, next) => {
  try {
    const document = await CVService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was deleted successfully", document });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Error deleting with id= ${req.params.id}`));
  }
};
