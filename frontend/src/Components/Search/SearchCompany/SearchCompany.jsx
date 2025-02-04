import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { StyledInputBase } from "~/Components/Search/Search.styles";

import "./SearchCompany.css";
function SearchCompany() {
  const [selected, setSelected] = useState("Công Ty Hàng Đầu");
  const buttons = [
    "Công Ty Hàng Đầu",
    "Công Ty Được Theo Dõi Nhiều",
    "Công Ty Có Việc Làm Mới Nhất",
    "Công Ty Đang Chờ Đón Bạn",
  ];

  return (
    <Box className="search">
      <Typography className="search-name">Tìm kiếm</Typography>
      <Box className="searchbar">
        {/* Input tìm kiếm */}
        <StyledInputBase
          placeholder="Nhập từ khóa công ty"
          inputProps={{ "aria-label": "search" }}
          className="search-input"
        />
        {/* Nút bấm tìm kiếm */}
        <Button
          variant="contained"
          className="search-btn"
          startIcon={<SearchIcon />}
        >
          Tìm kiếm
        </Button>
      </Box>
      <Box className="company-sort">
        {buttons.map((label) => (
          <Button
            key={label}
            variant={selected === label ? "contained" : "outlined"}
            className="company-sort-btn"
            onClick={() => setSelected(label)} // Cập nhật trạng thái khi click
          >
            {label}
          </Button>
        ))}
      </Box>

    </Box>
  );
}

export default SearchCompany;
