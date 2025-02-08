const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const employerRoutes = require("./routes/employerRoutes");
const recruitmentNewsRoutes = require("./routes/recruitmentNewsRoutes");
const fieldRoutes = require("./routes/fieldRoutes");
const authRoutes = require("./routes/authRoutes");
const loaiHopDongRoutes = require("./routes/loaiHopDongRoutes");
const loaiHinhRoutes = require("./routes/loaiHinhRoutes");
const capBacRoutes = require("./routes/capBacRoutes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Cho phép React frontend truy cập
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép
    credentials: true, // Cho phép gửi cookie và header authentication
  })
);
app.use("/users", userRoutes);
app.use("/employers", employerRoutes);
app.use("/recruitments", recruitmentNewsRoutes);
app.use("/fields", fieldRoutes);
app.use("/auth-page", authRoutes);
app.use("/loai-hd", loaiHopDongRoutes);
app.use("/loai-hinh", loaiHinhRoutes);
app.use("/cap-bac", capBacRoutes);

module.exports = app;
