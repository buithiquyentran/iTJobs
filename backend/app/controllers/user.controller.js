const { sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const { LuuTTD } = require("../models");
// exports.getUsers = async (req, res) => {
//   try {
//     const [rows] = await sequelize.query("SELECT * FROM user");
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Error fetching users" });
//   }
// };
exports.getEmployers = async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT * from user where MA_ROLE=2");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const UserService = require("../services/user.service");
exports.getAll = async (req, res) => {
  try {
    const response = await UserService.getAll();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getEmployers = async (req, res) => {
  try {
    const response = await UserService.getEmployers();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getEmployees = async (req, res) => {
  try {
    const response = await UserService.getEmployees();
    res.json(response);
  } catch (error) {
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
exports.getOne = async (req, res) => {
  try {
    const response = await UserService.findById(req.params.id);
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
    const document = await UserService.update(req.params.id, req.body);
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
    const document = await UserService.create(req.body);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was created successfully", document });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Error creating `));
  }
};
exports.delete = async (req, res, next) => {
  try {
    const document = await UserService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Enity not found"));
    }
    return res.send({ message: "Enity was deleted successfully", document });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Error deletin`));
  }
};
