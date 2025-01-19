import React, { useState } from "react";

import Grid from "@mui/material/Grid2";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Tabs,
  Tab,
} from "@mui/material";
const RegisterEmployee = ({ switchToLogin }) => {
  return (
    <Box sx={{ marginTop: "60px" }}>
      {/* <Typography variant="h6" textAlign="center" my={5}>
        Đăng Ký Tài Khoản Người Lao Động
      </Typography> */}

      <TextField
        label="Họ và tên"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Số điện thoại"
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Mật khẩu"
        type="password"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Xác nhận mật khẩu"
        type="password"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Đăng ký
      </Button>
      <Typography>
        Bạn đã có tài khoản người lao động?&nbsp;
        <Link
          underline="none"
          onClick={switchToLogin}
          style={{ cursor: "pointer" }}
        >
          Đăng nhập ngay
        </Link>
      </Typography>
    </Box>
  );
};
export default RegisterEmployee;
