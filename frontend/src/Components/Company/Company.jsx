import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import "./Company.css";
import { NoEncryption } from "@mui/icons-material";
const Company = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        borderRadius: "none",
        height: "461px",
      }}
    >
      {/* Hình ảnh */}
      <Box className="company-banner">
        <CardMedia
          component="img"
          height="100%"
          image="https://salt.topdev.vn/MR1Y_GUMkKRo91V8JpXGjJq1ZkY8rIhxfxBdl5g1nN4/auto/310/250/ce/1/aHR0cHM6Ly90b3BkZXYudm4vYXNzZXRzL2Rlc2t0b3AvaW1hZ2VzL2NvbXBhbnktc2NlbmUtMy5wbmc/company-scene-3.jpg"
          alt="Job banner"
        />
        <Box sx={{ padding: 2, display: "flex" }}>
          <CardMedia
            className="company-logo"
            component="img"
            sx={{
              width: "160px",
              borderRadius: 1,
              marginRight: 2,
            }}
            image="https://salt.topdev.vn/kuC0LTMMJGOjlgSGZXLZa1JMjJDxK6R_63CNk0G9Ztg/fit/384/1000/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL2ltYWdlcy8yMDI0LzEwLzE4L1RvcERldi1Mb2dvLUZESS1UUk9OLTAxLS0tdGh1b25nLWxlLTE3MjkyNDU0MTQucG5n" // Logo công ty
            alt="Company logo"
          />
          <Typography
            variant="h6"
            sx={{
              marginLeft: "157px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2, // Giới hạn 3 dòng
              textOverflow: "ellipsis",
              marginBottom: "24px",
            }}
          >
            CÔNG TY TNHH LIÊN DOANH XÚC TIẾN ĐẦU TƯ VÀ HỢP TÁC QUỐC TẾ FDI
          </Typography>
        </Box>
      </Box>
      {/* Chi tiết */}
      <Box sx={{ padding: 1, marginTop: "99px" }}>
        <Typography variant="body2" color="text.main" noWrap>
          FDI Việt Nam - Hợp tác để thành công
        </Typography>
        <CardContent sx={{ padding: 0 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Quận Thanh Xuân, Hà Nội
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              marginTop: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography color="text.secondary">Fintech</Typography>
            {/* Nút Chi tiết */}
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", padding: 0 }}
            >
              <Button
                size="small"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                color="primary"
              >
                Chi tiết →
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Company;
