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
import { CheckCircle, Delete, Visibility } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BlockIcon from "@mui/icons-material/Block";
import SearchIcon from "@mui/icons-material/Search";

import nhaTuyenDungService from "~/services/nhaTuyenDung.service";
import userService from "~/services/user.service";
const Employers = () => {
  const [value, setValue] = useState("1"); // State để theo dõi tab nào đang được chọn
  const [employers, setEmployers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState([]);
  const [employerStrings, setEmployerStrings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await nhaTuyenDungService.getAll();
        setEmployers(response);
        setFilters(response);
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
        console.log(employerStrings[0]);
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
    // console.log(employers[0]?.User.APPROVAL_STATUS === "pending");
    filters?.filter((r) => r.User.APPROVAL_STATUS === APPROVAL_STATUS);
  const handleChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };
  const handleSearch = async () => {
    console.log(keyword);
    if (keyword) {
      const employeefilter = filters?.filter((employers, index) =>
        employerStrings[index]
          ?.trim()
          .toLowerCase()
          .includes(keyword.toLowerCase().trim())
      );
      setFilters(employeefilter);
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

// Component hiển thị bảng
const RecruiterTable = ({ filters }) => {
  const [recruiters, setRecruiters] = useState(filters || []);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    setRecruiters(filters || []);
  }, [filters]);

  // Xử lý duyệt tài khoản
  const handleApprove = async (SDT, status) => {
    try {
      // const confirm = window.confirm("Bạn muốn duyệt tài khoản này?");
      // if (confirm) {
      setRecruiters((prev) =>
        prev.map((r) => (r.SDT === SDT ? { ...r, APPROVAL_STATUS: status } : r))
      );
      return await userService.update(SDT, { APPROVAL_STATUS: status });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // Xử lý xóa tài khoản
  const handleDelete = async (SDT, TEN_NTD) => {
    try {
      const confirm = window.confirm(`Bạn muốn xóa nhà tuyển dụng ${TEN_NTD}`);
      if (confirm) {
        setRecruiters((prev) => prev.filter((r) => r.SDT !== SDT));
        return await userService.delete(SDT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Xử lý mở modal xem chi tiết
  const handleView = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setOpenDialog(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Tên Công Ty</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Trạng Thái</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recruiters.length > 0 ? (
            recruiters.map((recruiter) => (
              <TableRow key={recruiter.MA_NTD}>
                <TableCell>{recruiter.MA_NTD}</TableCell>
                <TableCell>{recruiter.TEN_NTD}</TableCell>
                <TableCell>{recruiter.User.SDT}</TableCell>
                <TableCell>{recruiter.User.APPROVAL_STATUS}</TableCell>
                <TableCell>
                  {recruiter.User.APPROVAL_STATUS === "pending" && (
                    <IconButton
                      color="success"
                      onClick={() => handleApprove(recruiter.SDT, "approved")}
                    >
                      <CheckCircle />
                    </IconButton>
                  )}
                  <IconButton
                    color="primary"
                    onClick={() => handleView(recruiter)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleDelete(recruiter.User.SDT, recruiter.TEN_NTD)
                    }
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Chi Tiết Nhà Tuyển Dụng</DialogTitle>
        <DialogContent>
          {selectedRecruiter && (
            <div>
              <p>
                <strong>Tên Công Ty:</strong> {selectedRecruiter.TEN_NTD}
              </p>
              <p>
                <strong>Mã số thuế:</strong> {selectedRecruiter.MST}
              </p>
              <p>
                <strong>Email:</strong> {selectedRecruiter.EMAIL}
              </p>
              <p>
                <strong>SDT:</strong> {selectedRecruiter.SDT}
              </p>
              <p>
                <strong>Quy Mô:</strong> {selectedRecruiter.QUY_MO}
              </p>
              <p>
                <strong>Quốc Tịch:</strong> {selectedRecruiter.QUOC_TICH}
              </p>
              <p>
                <strong>Website:</strong> {selectedRecruiter.WEBSITE}
              </p>
              <p>
                <strong>Lĩnh vực:</strong>
              </p>
              <ul>
                {selectedRecruiter.LinhVucs?.map((item, index) => (
                  <li key={index}>{item.TEN_LV}</li>
                ))}
              </ul>
              <p>
                <strong>Kĩ Năng:</strong>
              </p>
              <ul>
                {selectedRecruiter.KiNangs?.map((item, index) => (
                  <li key={index}>{item.TEN_KN}</li>
                ))}
              </ul>
              <p>
                <strong>Địa Chỉ:</strong>
              </p>
              <ul>
                {selectedRecruiter.DIA_CHI_CU_THE?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>Trạng Thái:</strong>{" "}
                {selectedRecruiter.User.APPROVAL_STATUS}
              </p>
              <strong>Về Công Ty:</strong>{" "}
              <ul>
                {selectedRecruiter.ABOUT?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <IconButton
            color="error"
            onClick={() => {
              handleApprove(selectedRecruiter.SDT, "rejected");
              setOpenDialog(false);
            }}
          >
            <BlockIcon></BlockIcon>
            {"Từ chối"}
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => {
              handleApprove(selectedRecruiter.SDT, "approved");
              setOpenDialog(false);
            }}
          >
            <CheckCircle></CheckCircle>
            {"  Duyệt"}
          </IconButton>

          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default Employers;
