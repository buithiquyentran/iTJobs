const AuthService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models");
const NguoiLaoDongService = require("../services/nguoiLaoDong.service");
const NhaTuyenDungService = require("../services/nhaTuyenDung.service");

// Đăng ký nhà tuyển dụng
// exports.registerEmployer = async (req, res) => {
//   try {
//     const user = await AuthService.registerEmployer(req.body);
//     const token = AuthService.generateToken(user);

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 1000 * 24 * 7, // 1 giờ
//     });

//     res.status(200).json({
//       message: user.SDT ? "Register successfully" : "Register fail",
//       user,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server", error: error.message });
//   }
// };
exports.registerEmployer = async (req, res) => {
  try {
    const user = await AuthService.registerEmployer(req.body);

    // Nếu registerEmployer trả về lỗi (dưới dạng object có message)
    if (user?.message) {
      return res.status(400).json({
        message: "Tạo tài khoản thất bại",
        error: user.message,
      });
    }

    const token = AuthService.generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000 * 24 * 7, // 7 ngày
    });

    res.status(200).json({
      message: "Register successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Lỗi registerEmployer:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};


// Đăng ký người lao động
exports.registerEmployee = async (req, res) => {
  try {
    const user = await AuthService.registerEmployee(req.body);
    const token = AuthService.generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000 * 24 * 7, // 1 giờ
    });

    res.status(user.SDT ? 200 : 400).json({
      message: user.SDT ? "Register successfully" : "Register fail",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const user = await AuthService.login(req.body);
    
    const token = AuthService.generateToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000 * 24 * 7, // 7 ngày
    });

    res.status(user ? 200 : 401).json({
      message: user ? "Đăng nhập thành công" : "Đăng nhập thất bại",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Đăng xuất
exports.logout = (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.status(200).json({ message: "Đăng xuất thành công!" });
};

exports.getUserInfo = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { SDT } = decoded;
    console.log(SDT);

    const document = await NhaTuyenDungService.findBySDT(SDT);
    if (document) return res.status(200).json(document);

    const document2 = await NguoiLaoDongService.findBySDT(SDT);
    if (document2) return res.status(200).json(document2);

    const document3 = await AuthService.findBySDT(SDT);
    if (document3) return res.status(200).json(document3);

    // Nếu không tìm thấy bất kỳ đối tượng nào
    return res
      .status(404)
      .json({ message: "Không tìm thấy thông tin người dùng" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
