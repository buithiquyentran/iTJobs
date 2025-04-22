import React, { useState, useEffect } from "react";
import {
  Box,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { StyledInputBase } from "~/Components/Search.styles";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BlockIcon from "@mui/icons-material/Block";
import SearchIcon from "@mui/icons-material/Search";

import nhaTuyenDungService from "~/services/nhaTuyenDung.service";
import RecruiterTable from "~/Components/RecruiterTable";
const Employers = () => {
  const [value, setValue] = useState("1"); // State để theo dõi tab nào đang được chọn
  const [employers, setEmployers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [fs, setFs] = useState([]);
  const [employerStrings, setEmployerStrings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await nhaTuyenDungService.getAll();
        setEmployers(response);
        setFs(response);
        const employerStrings = response.map((employee) => {
          const {
            MA_NTD,
            TEN_NTD,
            LOGAN,
            ABOUT,
            QUY_MO,
            QUOC_TICH,
            DAI_NGO,
            DIA_CHI,
            WEBSITE,
            MST,
            EMAIL,
            SDT,
            LinhVucs,
            KiNangs,
          } = employee;
          const LINH_VUC = LinhVucs?.map((item) => item.TEN_CB).join(" ");
          const KI_NANG = KiNangs?.map((item) => item.TEN_KN).join(" ");
          return [
            MA_NTD,
            TEN_NTD,
            LOGAN,
            ABOUT,
            QUY_MO,
            QUOC_TICH,
            DAI_NGO,
            DIA_CHI,
            WEBSITE,
            MST,
            EMAIL,
            SDT,
            LINH_VUC,
            KI_NANG,
          ]
            .join(" ")
            .trim()
            .toLowerCase();
        });
        // console.log(employerStrings[0]);
        setEmployerStrings(employerStrings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // Xử lý đổi tab
  const handleChangeTap = (event, newValue) => {
    setValue(newValue);
  };

  // Lọc nhà tuyển dụng theo trạng thái
  const filteredRecruiters = (APPROVAL_STATUS) =>
    fs?.filter((r) => r.User.APPROVAL_STATUS === APPROVAL_STATUS);

  const handleChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };
  const handleSearch = async () => {
    console.log(keyword);
    if (keyword) {
      const employeefilter = fs?.filter((employers, index) =>
        employerStrings[index]
          ?.trim()
          .toLowerCase()
          .includes(keyword.toLowerCase().trim())
      );
      setFs(employeefilter);
    }
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        {/* Tabs List */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TabList
            sx={{ textTransform: "none" }}
            onChange={handleChangeTap}
            aria-label="Tabs"
          >
            <Tab sx={{ textTransform: "none" }} label="Chờ Duyệt" value="1" />
            <Tab sx={{ textTransform: "none" }} label="Đã Duyệt" value="2" />
            <Tab sx={{ textTransform: "none" }} label="Bị Từ Chối" value="3" />
            <Tab sx={{ textTransform: "none" }} label="Tất Cả" value="4" />
          </TabList>
          {/* Search*/}
          <Box className="searchbar" sx={{ flexGrow: 1, marginLeft: 4 }}>
            {/* Input tìm kiếm */}
            <StyledInputBase
              placeholder="Nhập từ khóa công việc"
              inputProps={{ "aria-label": "search" }}
              className="search-input"
              onChange={handleChange}
              value={keyword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // Gọi hàm tìm kiếm
                }
              }}
            />
            {/* Nút bấm tìm kiếm */}
            <Button
              onClick={handleSearch}
              variant="contained"
              className="search-btn"
              startIcon={<SearchIcon />}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Box>

        {/* Tab Chờ Duyệt */}
        <TabPanel sx={{ padding: 0 }} value="1">
          <RecruiterTable filters={filteredRecruiters("pending")} />
        </TabPanel>

        {/* Tab Đã Duyệt */}
        <TabPanel sx={{ padding: 0 }} value="2">
          <RecruiterTable filters={filteredRecruiters("approved")} />
        </TabPanel>

        {/* Tab Bị Từ Chối */}
        <TabPanel sx={{ padding: 0 }} value="3">
          <RecruiterTable filters={filteredRecruiters("rejected")} />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="4">
          <RecruiterTable filters={employers} />
        </TabPanel>
      </TabContext>
      {/* Modal xem chi tiết nhà tuyển dụng */}
    </Box>
  );
};

export default Employers;
