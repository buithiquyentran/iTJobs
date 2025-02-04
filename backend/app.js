const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const employerRoutes = require("./routes/employerRoutes");
const recruitmentNewsRoutes = require("./routes/recruitmentNewsRoutes");
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
module.exports = app;
