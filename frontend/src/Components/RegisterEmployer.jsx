import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

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
const RegisterEmployer = ({ switchToLogin }) => {
  const [selected, setSelected] = useState("");
  const options = ["Ngân hàng", "Doanh nghiệp", "OutSource"];
  return (
    <Box sx={{ marginTop: "60px" }}>
      <Typography color="var(--mui-palette-error-main)" fontWeight="bold">
        Thông tin đăng nhập
      </Typography>
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
      <Typography color="var(--mui-palette-error-main)" fontWeight="bold">
        Thông tin công ty
      </Typography>

      <TextField
        label="Tên công ty"
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Mã số thuế"
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Địa chỉ"
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControl
        variant="outlined"
        style={{
          minWidth: "100%",
          marginTop: "16px",
          marginBottom: "8px",
          height: "50px",
        }}
      >
        <InputLabel>Lĩnh vực</InputLabel>
        <Select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          label="Lĩnh vực"
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Đăng ký
      </Button>

      <Typography>
        Bạn đã có tài khoản nhà tuyển dụng?&nbsp;
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
export default RegisterEmployer;
