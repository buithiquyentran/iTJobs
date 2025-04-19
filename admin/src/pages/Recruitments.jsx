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
} from "@mui/material";
import { StyledInputBase } from "~/Components/Search.styles";
import SearchIcon from "@mui/icons-material/Search";

import { CheckCircle, Delete, Visibility } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BlockIcon from "@mui/icons-material/Block";

import tinTuyenDungService from "~/services/tinTuyenDung.service";
const Recruitments = () => {
  const [value, setValue] = useState("5"); // State để theo dõi tab nào đang được chọn
  const [recruitments, setRecruitments] = useState([]); // tất cả tin
  const [recruitmentTab, setRecruitmentTab] = useState([]); // render tin của mỗi tab

  const [keyword, setKeyword] = useState(""); // từ khóa
  const [filters, setFilters] = useState([]); //lọc
  const [strings, setStrings] = useState([]); // dùng tìm kiếm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tinTuyenDungService.getAll();
        setRecruitments(response);
        setFilters(response);
        setRecruitmentTab(response);
        const employerStrings = response?.map((employee) => {
          const {
            MA_TTD,
            TEN_TTD,
            DIA_CHI,
            DIA_CHI_CU_THE,
            NGAY,
            MUC_LUONG,
            TRACH_NHIEM,
            CHUYEN_MON,
            NICE_TO_HAVE,
            PHUC_LOI,
            QUI_TRINH_PV,
            NhaTuyenDung,
            CapBacs,
            KiNangs,
          } = employee;
          const CAP_BAC = CapBacs?.map((item) => item.TEN_CB).join(" ");
          const KI_NANG = KiNangs?.map((item) => item.TEN_KN).join(" ");
          const DIA_CHI_CU_THE_S = DIA_CHI_CU_THE?.join(" ");
          const CHUYEN_MON_S = CHUYEN_MON?.join(" ");
          const NICE_TO_HAVE_S = NICE_TO_HAVE?.join(" ");
          const PHUC_LOI_S = PHUC_LOI ? PHUC_LOI?.join(" ") : "";
          const TRACH_NHIEM_S = TRACH_NHIEM?.join(" ");
          const QUI_TRINH_PV_S = QUI_TRINH_PV?.join(" ");

          return [
            MA_TTD,
            TEN_TTD,
            DIA_CHI,
            DIA_CHI_CU_THE_S,
            NGAY?.split("T")[0],
            MUC_LUONG,
            TRACH_NHIEM_S,
            CHUYEN_MON_S,
            NICE_TO_HAVE_S,
            PHUC_LOI_S,
            QUI_TRINH_PV_S,
            CAP_BAC,
            KI_NANG,
            NhaTuyenDung.TEN_NTD,
            NhaTuyenDung.QUOC_TICH,
          ]
            .join(" ")
            .trim()
            .toLowerCase();
        });
        console.log(employerStrings[15]);
        setStrings(employerStrings);
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

  const filteredRecruiters = (status) => {
    if (!recruitments || recruitments.length === 0) return [];
    const filtered = recruitments.filter((r) => r.STATUS === status);
    setRecruitmentTab(filtered);
    return filtered;
  };

  // -1 reject
  // 0 pending
  // 1 ok
  // 2 report
  const handleChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };
  const handleSearch = async () => {
    console.log(recruitmentTab);
    if (keyword) {
      const employeefilter = recruitmentTab?.filter((item, index) =>
        strings[index]
          ?.trim()
          .toLowerCase()
          .includes(keyword.toLowerCase().trim())
      );
      console.log(employeefilter);
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
            <Tab sx={{ textTransform: "none" }} label="Bị Báo Cáo" value="4" />
            <Tab sx={{ textTransform: "none" }} label="Tất Cả" value="5" />
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
          <RecruiterTable filters={() => filteredRecruiters(0)} />
        </TabPanel>

        {/* Tab Đã Duyệt */}
        <TabPanel sx={{ padding: 0 }} value="2">
          <RecruiterTable filters={() => filteredRecruiters(1)} />
        </TabPanel>

        {/* Tab Bị Từ Chối */}
        <TabPanel sx={{ padding: 0 }} value="3">
          <RecruiterTable filters={() => filteredRecruiters(-1)} />
        </TabPanel>
        {/* Tab Bị Báo Cáo */}
        <TabPanel sx={{ padding: 0 }} value="4">
          <RecruiterTable filters={() => filteredRecruiters(2)} />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="5">
          <RecruiterTable filters={filters} />
        </TabPanel>
      </TabContext>
      {/* Modal xem chi tiết nhà tuyển dụng */}
    </Box>
  );
};

// Component hiển thị bảng
const RecruiterTable = ({ filters }) => {
  const [recruitments, setRecruitments] = useState(filters || []);

  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    setRecruitments(filters || []);
  }, [filters]);
  // Xử lý duyệt tài khoản
  const handleApprove = async (MA_TTD, status) => {
    try {
      setRecruitments((prev) =>
        prev.map((r) => (r.MA_TTD === MA_TTD ? { ...r, STATUS: status } : r))
      );
      return await tinTuyenDungService.update(MA_TTD, {
        STATUS: status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Xử lý xóa tài khoản
  const handleDelete = (id) => {
    setRecruitments((prev) => prev.filter((r) => r.id !== id));
  };

  // Xử lý mở modal xem chi tiết
  const handleView = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setOpenDialog(true);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Tên Tin Tuyển Dụng</TableCell>
            <TableCell>Tên Nhà Tuyển Dụng</TableCell>
            <TableCell>Ngày</TableCell>
            <TableCell>Trạng Thái</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recruitments.length > 0 ? (
            recruitments.map((recruiter, index) => (
              <TableRow key={index}>
                <TableCell>{recruiter.MA_TTD}</TableCell>
                <TableCell>{recruiter.TEN_TTD}</TableCell>
                <TableCell>{recruiter.NhaTuyenDung.TEN_NTD}</TableCell>
                <TableCell>{formatDate(recruiter.NGAY)}</TableCell>
                <TableCell>
                  {recruiter.STATUS == 1
                    ? "excepted"
                    : recruiter.STATUS == -1
                    ? "rejected"
                    : "pending"}
                </TableCell>
                <TableCell>
                  {recruiter.status === "Chờ duyệt" && (
                    <IconButton
                      color="success"
                      onClick={() => handleApprove(recruiter.MA_TTD, 1)}
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
                    onClick={() => handleDelete(recruiter.id)}
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
        <DialogTitle>Chi Tiết Tin Tuyển Dụng</DialogTitle>
        <DialogContent>
          {selectedRecruiter && (
            <div>
              <p>
                <strong>Mã TTD:</strong> {selectedRecruiter.MA_TTD}
              </p>
              <p>
                <strong>Tên TTD:</strong> {selectedRecruiter.TEN_TTD}
              </p>
              <p>
                <strong>Địa chỉ:</strong>
              </p>
              <ul>
                {selectedRecruiter.DIA_CHI_CU_THE?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>Ngay:</strong> {formatDate(selectedRecruiter.NGAY)}
              </p>
              <p>
                <strong>Mức lương:</strong> {selectedRecruiter.MUC_LUONG}
              </p>
              <p>
                <strong>Trách nhiệm:</strong>
              </p>
              <ul>
                {selectedRecruiter.TRACH_NHIEM?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>Chuyên môn:</strong>
              </p>
              <ul>
                {selectedRecruiter.CHUYEN_MON?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>Nice to have:</strong>
              </p>
              <ul>
                {selectedRecruiter.NICE_TO_HAVE?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>Phúc lợi:</strong>
              </p>
              <ul>
                {selectedRecruiter.PHUC_LOI?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>Quy trình phỏng vấn:</strong>
              </p>
              <ul>
                {selectedRecruiter.QUI_TRINH_PV?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p>
                <strong>Trạng Thái:</strong>{" "}
                {selectedRecruiter.STATUS == 1
                  ? "acepted"
                  : selectedRecruiter.STATUS == -1
                  ? "rejected"
                  : "pending"}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <IconButton
            color="error"
            onClick={() => {
              handleApprove(selectedRecruiter.MA_TTD, -1);
              setOpenDialog(false);
            }}
          >
            <BlockIcon></BlockIcon>
            {"Từ chối"}
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => {
              handleApprove(selectedRecruiter.MA_TTD, 1);
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

export default Recruitments;
