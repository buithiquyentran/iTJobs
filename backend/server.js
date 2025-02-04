const dotenv = require("dotenv");
const { sequelize } = require("./models"); // Import sequelize từ models/index.js
const app = require("./app");

dotenv.config();

const startServer = async () => {
  try {
    // Kết nối cơ sở dữ liệu
    await sequelize.authenticate();
    console.log("Database connected!");

    // Đồng bộ các bảng
    await sequelize.sync({ alter: true });
    console.log("Database synchronized!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); // Thoát ứng dụng nếu có lỗi
  }
};

startServer();
