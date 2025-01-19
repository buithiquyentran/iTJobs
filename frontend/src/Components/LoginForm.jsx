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

const LoginForm = ({ switchToRegister }) => (
  <Box component="form" sx={{ mt: 2 }}>
    {/* <Typography variant="h6" textAlign="center" mb={2} frontWeight="bold">
        Đăng Nhập
      </Typography> */}
    <TextField
      label="Tên đăng nhập"
      type="text"
      fullWidth
      margin="normal"
      InputProps={{ sx: { height: 60 } }}
      variant="outlined"
    />
    <TextField
      label="Mật khẩu"
      type="password"
      fullWidth
      margin="normal"
      variant="outlined"
    />
    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
      Đăng nhập
    </Button>
    <Box textAlign="center" mt={2}>
      <Link href="#" underline="none">
        Quên mật khẩu?
      </Link>
      <Typography>
        Bạn chưa có tài khoản?&nbsp;
        <Link
          underline="none"
          onClick={switchToRegister}
          style={{ cursor: "pointer" }}
        >
          Đăng ký ngay
        </Link>
      </Typography>
    </Box>
  </Box>
);
export default LoginForm;
