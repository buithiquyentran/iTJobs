const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const app = express();
const capBacRoutes = require("./app/routes/capBac.route");
const kiNangRoutes = require("./app/routes/kiNang.route");
const linhVucRoutes = require("./app/routes/linhVuc.route");
const loaiHinhRoutes = require("./app/routes/loaiHinh.route");
const loaiHopDongRoutes = require("./app/routes/loaiHopDong.route");
const userRoutes = require("./app/routes/user.route");
const nguoiLaoDongRoutes = require("./app/routes/nguoiLaoDong.route");
const nhaTuyenDungRoutes = require("./app/routes/nhaTuyenDung.route");
const tinTuyenDungRoutes = require("./app/routes/tinTuyenDung.route");
const authRoutes = require("./app/routes/auth.route");
const followRoutes = require("./app/routes/follow.route");
const luuTtdRoutes = require("./app/routes/luuTtd.route");
const ungTuyenRoutes = require("./app/routes/ungTuyen.route");
const cvRoutes = require("./app/routes/cv.route");
const duAnRoutes = require("./app/routes/duAn.route");
const thongBaoRoutes = require("./app/routes/thongBao.route");

const uploadRoutes = require("./app/routes/upload.route");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Cho phép React frontend truy cập
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép
    credentials: true, // Cho phép gửi cookie và header authentication
  })
);

// app.use("/api/uploads", express.static(path.join(__dirname, "./app/uploads")));
// app.use("/api/uploads/CV", express.static("./app/uploads/CV"));
app.use("/uploads", express.static(path.join(__dirname, "app/uploads")));
app.use("/api/upload", uploadRoutes);

app.use("/api/users", userRoutes);

app.use("/api/nha-tuyen-dung", nhaTuyenDungRoutes);

app.use("/api/nguoi-lao-dong", nguoiLaoDongRoutes);

app.use("/api/tin-tuyen-dung", tinTuyenDungRoutes);
app.use("/api/linh-vuc", linhVucRoutes);
app.use("/api/auth-page", authRoutes);
app.use("/api/loai-hd", loaiHopDongRoutes);
app.use("/api/loai-hinh", loaiHinhRoutes);
app.use("/api/cap-bac", capBacRoutes);
app.use("/api/ki-nang", kiNangRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/luu-ttd", luuTtdRoutes);
app.use("/api/ung-tuyen", ungTuyenRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/du-an", duAnRoutes);
app.use("/api/thong-bao", thongBaoRoutes);

app.use("/api/upload", uploadRoutes);

module.exports = app;
