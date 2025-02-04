const { sequelize } = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT * FROM user");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};
exports.getEmployers = async (req, res) => {
  try {
    const [rows] = await sequelize.query("SELECT * from user where MA_ROLE=2");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};
