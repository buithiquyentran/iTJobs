import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Chip, Box } from "@mui/material";

import {
  StyledInputBase,
  CustomFilterDropdown,
} from "~/Components/Search/Search.styles";
import "./SearchJob.css";

const keywords = [
  "Java",
  "C++",
  "JavaScript",
  "UI/UX",
  "C#",
  "Fresher",
  "Python",
  "PHP",
  "Product Owner",
];
const addressOptions = ["Cần Thơ", "Hồ Chí Minh", "Đà Nẵng", "Hà Nội"];
const jobLevels = [
  "Intern",
  "Fresher",
  "Junior",
  "Middle",
  "Senior",
  "Trưởng nhóm",
  "Trưởng phòng",
  "All levels",
];
const typeOfWorks = ["In office", "Hybrid", "Remote", "Oversea"];
const employmentTypes = ["Full-time", "Part-time", "Freelance"];
function SearchJob() {
  return (
    <Box className="search">
      <Typography className="search-name">Tìm kiếm</Typography>
      <Box className="searchbar">
        {/* Input tìm kiếm */}
        <StyledInputBase
          placeholder="Nhập từ khóa công việc"
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
      <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap", mt: 2 }}>
        <span>Đề xuất từ khóa:</span>
        {keywords.map((keyword, index) => (
          <Chip
            sx={{ borderRadius: "4px" }}
            key={index}
            label={keyword}
            clickable
            variant="outlined"
          />
        ))}
      </Box>
      <Box className="sort-section">
        <CustomFilterDropdown
          sx={{ minWidth: "190px" }}
          label="Tất cả địa điểm"
          options={addressOptions}
        />
        <CustomFilterDropdown label="Tất cả cấp bậc" options={jobLevels} />
        <CustomFilterDropdown
          label="Tất cả loại công việc"
          options={typeOfWorks}
        />
        <CustomFilterDropdown
          label="Tất cả loại hợp đồng"
          options={employmentTypes}
        />
        <Button variant="contained" startIcon={<FilterAltOffIcon />}>
          Xóa bộ lọc
        </Button>
      </Box>
    </Box>
  );
}

export default SearchJob;
