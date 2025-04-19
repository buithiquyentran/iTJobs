const jwt = require("jsonwebtoken");
const { sequelize } = require("../config/db");
const { User } = require("../models");

class AuthService {
  constructor() {}

  generateToken(user) {
    const payload = {
      SDT: user.SDT,
      MA_ROLE: user.MA_ROLE,
      APPROVAL_STATUS: user.APPROVAL_STATUS,
    };
    let token = null;
    try {
      token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    } catch (error) {
      console.error(error);
    }
    return token;
  }

  async registerEmployer(data) {
    const { SDT, MK, TEN_NTD, EMAIL, MST, DIA_CHI, Linh_Vuc } = data;
    try {
      const [user] = await sequelize.query(
        "CALL registerEmployer(:SDT, :MK, :TEN_NTD, :EMAIL, :MST, :DIA_CHI, :Linh_Vuc)",
        {
          replacements: { SDT, MK, TEN_NTD, EMAIL, MST, DIA_CHI, Linh_Vuc },
        }
      );
      return user.message;
    } catch (error) {
      throw new Error("Lỗi khi đăng ký nhà tuyển dụng: " + error.message);
    }
  }

  async registerEmployee(data) {
    const { SDT, MK, TEN_NLD } = data;
    try {
      const [user] = await sequelize.query(
        "CALL registerEmployee(:SDT, :MK, :TEN_NLD)",
        {
          replacements: { SDT, MK, TEN_NLD },
        }
      );
      return user;
    } catch (error) {
      throw new Error("Lỗi khi đăng ký người lao động: " + error.message);
    }
  }
  async createAdmin(data) {
    const { SDT, MK } = data;
    try {
      const [user] = await sequelize.query("CALL createAdmin(:SDT, :MK)", {
        replacements: { SDT, MK },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Lỗi create: " + error.message);
    }
  }
  async login(data) {
    const { SDT, MK } = data;
    try {
      const [user] = await sequelize.query("CALL login(:SDT, :MK)", {
        replacements: { SDT, MK },
      });
      return user;
    } catch (error) {
      throw new Error("Lỗi khi đăng nhập: " + error.message);
    }
  }
  async findBySDT(SDT) {
    return await User.findOne({
      SDT: SDT,
    });
  }
}

module.exports = new AuthService();
