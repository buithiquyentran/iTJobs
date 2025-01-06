import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { StyledInputBase } from "~/Components/Search/Search.styles";

import "./SearchCompany.css";
function SearchCompany() {
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
        <Button variant="contained" className="company-sort-btn">
          Công Ty Hàng Đầu
        </Button>
        <Button variant="outlined" className="company-sort-btn">
          Công Ty Được Theo Dõi Nhiều
        </Button>
        <Button variant="outlined" className="company-sort-btn">
          Công Ty Có Việc Làm Mới Nhất
        </Button>
        <Button variant="outlined" className="company-sort-btn">
          Công Ty Đang Chờ Đón Bạn
        </Button>
      </Box>
    </Box>
  );
}

export default SearchCompany;
