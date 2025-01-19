import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import "./Home.css";
import Job from "~/Components/Job/Job";
function Home() {
  // const jobs = [
  //   {
  //     "TEN_TTD": "CHUYÊN VIÊN DATA ARCHITECT",
  //     "DIA_CHI":	"Quận Thanh Xuân, Hà Nội",
  //     "NGAY": "2025-01-14 12:32:27",
  //     "MUC_LUONG": "Thương lượng",
  //     "PHUC_LOI": ["Đóng BHXH đầy đủ theo quy định pháp luật.", "Có cơ hội thăng tiến, tạo điều kiện tối đa để phát huy hết khả năng.", "Review lương 01 năm/02 lần.", "Được hưởng thu nhập tăng thêm theo đánh giá năng lực, hiệu quả công việc.", "Sinh nhật CBNV có 01 ngày nghỉ hưởng lương (không tính vào phép năm) và 500.000VND"],
  //     "LOGO": "https://salt.topdev.vn/KBn1GR9iLYGk-lM_EOA4kpL53i739MSA-VW1MOaiCac/fit/384/1000/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL2ltYWdlcy8yMDI0LzA4LzE5L1RvcERldi16NTc0NDg0MjY5NDUwN181OGZmNThlZTBhZWI5YmM0NTI2ZTc5NGU5YWIxNjQ0OS0xNzI0MDM3MzI4LmpwZw",

  //   },
  //   {	
  //     "TEN_TTD":"Front-end Developer (ReactJS, Angular)",
  //     "DIA_CHI":"Thành phố Thủ Đức, Hồ Chí Minh",
  //     "NGAY":"2025-01-14 12:32:28",
  //       "MUC_LUONG":"Thương lượng",
  //       "PHUC_LOI":["Lương trả theo năng lực nhân viên thông qua cơ chế lương dự án", "Đóng Bảo hiểm đầy đủ theo luật lao động hiện hành.", "Tết nguyên đán (thưởng tối thiểu tháng lương 13)"],
  //       "LOGO":"https://salt.topdev.vn/DA9TkAxt2vCbNfzBk4VVU9xZNquUB8uU8bm0JwZXk8U/fit/384/1000/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL2ltYWdlcy8yMDIxLzA2LzEwL2RkM2EwNDViZWViYTg2YjNhNjY5NDg2YzM1MDQ0YjBkLWFyMTBELnBuZw"

  //   }
  // ]
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "50vh",
        margin: "24px",
      }}
    >
      <Typography variant="h6" fontWeight="bold" marginBottom={1}>
        168 Việc Làm IT
      </Typography>
      <Grid container spacing={1}>
        <Grid size={6}>
          <Job />
        </Grid>
        <Grid size={6}>
          <Job />
        </Grid>
        <Grid size={6}>
          <Job />
        </Grid>
        <Grid size={6}>
          <Job />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
