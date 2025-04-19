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
  TextField,
  Typography,
} from "@mui/material";
import { StyledInputBase } from "~/Components/Search.styles";

import { CheckCircle, Delete, Visibility } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import nguoiLaoDongService from "~/services/nguoiLaoDong.service";
const Employees = () => {
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState([]);
  const [employeeStrings, setEmployeeStrings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await nguoiLaoDongService.getAll();
        setEmployees(response);
        setFilters(response);
        const employeeStrings = response.map((employee) => {
          const {
            MA_NLD,
            TEN_NLD,
            NAM_SINH,
            GIOI_TINH,
            QUE_QUAN,
            EMAIL,
            HOC_VAN,
            SDT,
            CapBacs,
            KiNangs,
          } = employee;
          const CAP_BAC = CapBacs?.map((item) => item.TEN_CB).join(" ");
          const KI_NANG = KiNangs?.map((item) => item.TEN_KN).join(" ");
          return [
            MA_NLD,
            TEN_NLD,
            NAM_SINH?.split("T")[0],
            GIOI_TINH,
            QUE_QUAN,
            EMAIL,
            HOC_VAN,
            SDT,
            CAP_BAC,
            KI_NANG,
          ]
            .join(" ")
            .trim()
            .toLowerCase();
        });
        console.log(employeeStrings[0]);
        setEmployeeStrings(employeeStrings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // Xử lý xóa tài khoản
  const handleDelete = (MA_NLD) => {
    setEmployees((prev) => prev.filter((r) => r.MA_NLD !== MA_NLD));
  };

  // Xử lý mở modal xem chi tiết
  const handleView = (employee) => {
    setSelectedRecruiter(employee);
    setOpenDialog(true);
  };

  const handleSearch = async () => {
    console.log(keyword);
    if (keyword) {
      const employeefilter = employees?.filter((employee, index) =>
        employeeStrings[index]
          ?.trim()
          .toLowerCase()
          .includes(keyword.toLowerCase().trim())
      );
      setFilters(employeefilter);
    }
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };
  return (
    <TableContainer component={Paper}>
      <Box>
        <Typography className="search-name">Tìm kiếm</Typography>
        <Box className="searchbar">
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Tên Người Lao Động</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filters.length > 0 ? (
            filters.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.MA_NLD}</TableCell>
                <TableCell>{employee.TEN_NLD}</TableCell>
                <TableCell>{employee.User?.SDT}</TableCell>
                <TableCell>{employee.EMAIL}</TableCell>
                {/* <TableCell>{employee.User?.APPROVAL_STATUS}</TableCell> */}
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleView(employee)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(employee.MA_NLD)}
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
                <strong>Họ Tên:</strong> {selectedRecruiter.TEN_NLD}
              </p>
              <p>
                <strong>Năm sinh:</strong>{" "}
                {selectedRecruiter.NAM_SINH?.split("T")[0]}
              </p>
              <p>
                <strong>Giới tính:</strong> {selectedRecruiter.GIOI_TINH}
              </p>
              <p>
                <strong>SDT:</strong> {selectedRecruiter.SDT}
              </p>
              <p>
                <strong>Email:</strong> {selectedRecruiter.EMAIL}
              </p>
              <p>
                <strong>Quê quán:</strong> {selectedRecruiter.QUE_QUAN}
              </p>
              <p>
                <strong>Học vấn:</strong> {selectedRecruiter.HOC_VAN}
              </p>

              <p>
                <strong>Cấp Bậc:</strong>
              </p>
              <ul>
                {selectedRecruiter.CapBacs?.map((item, index) => (
                  <li key={index}>{item.TEN_CB}</li>
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TableContainer>
  );
};

export default Employees;
