const { User } = require("../models/User");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
const NguoiLaoDong = require("../models/NguoiLaoDong");
const NhaTuyenDung = require("../models/NhaTuyenDung");
const { sequelize } = require("../config/db");

exports.registerEmployer = async (req, res) => {
  try {
    const { SDT, MK, TEN_NTD, EMAIL, MST, DIA_CHI, Linh_Vuc } = req.query;

    const [results] = await sequelize.query(
      "CALL registerEmployer(:SDT, :MK, :TEN_NTD, :EMAIL, :MST, :DIA_CHI, :Linh_Vuc)",
      {
        replacements: { SDT, MK, TEN_NTD, EMAIL, MST, DIA_CHI, Linh_Vuc },
      }
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
exports.registerEmployee = async (req, res) => {
  try {
    const { SDT, MK, TEN_NLD } = req.body;

    const [results] = await sequelize.query(
      "CALL registerEmployee(:SDT, :MK, :TEN_NLD)",
      {
        replacements: { SDT, MK, TEN_NLD },
      }
    );

    // Lấy message từ Stored Procedure
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { SDT, MK } = req.body;
    const [results] = await sequelize.query(
      "SELECT login(:SDT, :MK) AS isAuthenticated",
      {
        replacements: { SDT, MK },
      }
    );
    if (results[0].isAuthenticated == 1) {
      res.status(200).json({ message: "Đăng nhập thành công" });
    } else {
      res.status(500).json({ message: "Đăng nhập thất bại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
