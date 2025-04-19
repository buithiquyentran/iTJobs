const LuuTTDService = require("../services/luuTTD.service");
exports.getAll = async (req, res) => {
  try {
    const response = await LuuTTDService.getAll();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getOne = async (req, res) => {
  try {
    const { sdt, maTtd } = req.params;
    const response = await LuuTTDService.findById(sdt, maTtd);
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getByUsername = async (req, res) => {
  try {
    const { sdt } = req.params;
    const response = await LuuTTDService.findByUserName(sdt);
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
// exports.update = async (req, res, next) => {
//   if (Object.keys(req.body).length == 0) {
//     return next(new ApiError(400, "Data to update can not be empty"));
//   }
//   try {
//     const { maNld, maNtd } = req.params;

//     const document = await LuuTTDService.update(maNld, maNtd, req.body);
//     if (!document) {
//       return next(new ApiError(404, "Enity not found"));
//     }
//     return res.send({ message: "Enity was updated successfully", document });
//   } catch (error) {
//     console.error(error);
//     return next(new ApiError(500, `Error updating with id= ${req.params.id}`));
//   }
// };

exports.create = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    res.status(500).json({ message: "Data to create can not be empty" });
  }
  try {
    const document = await LuuTTDService.create(req.body);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was created successfully", document });
  } catch (error) {
    console.error(error);
    // return next(new ApiError(500, `Error creating with id= ${req.params.id}`));
  }
};
exports.delete = async (req, res, next) => {
  try {
    const { sdt, maTtd } = req.params;

    const document = await LuuTTDService.delete(sdt, maTtd);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was deleted successfully", document });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Error deleting with id= ${req.params.id}`));
  }
};
