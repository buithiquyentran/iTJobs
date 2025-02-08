const { sequelize, CapBac } = require("../models");
exports.getCapBacs = async (req, res) => {
  try {
    const cbs = await CapBac.findAll();
    const TEN_CB = cbs.map((cb) => cb.TEN_CB);
    res.json(TEN_CB);
  } catch (error) { 
    console.error("Error fetching", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
};
 