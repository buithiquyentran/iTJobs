import React, { useState } from "react";
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
import { CheckCircle, Delete, Visibility } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// Dữ liệu mẫu
const initialRecruiters = [
  {
    id: 1,
    MST: "22",
    name: "Công ty ABC",
    email: "abc@gmail.com",
    status: "Chờ duyệt",
  },
];

const Employers = () => {
  const [value, setValue] = useState("1"); // State để theo dõi tab nào đang được chọn

  // Xử lý đổi tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Lọc nhà tuyển dụng theo trạng thái
  const filteredRecruiters = (status) =>
    recruiters.filter((r) => r.status === status);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        {/* Tabs List */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            sx={{ textTransform: "none" }}
            onChange={handleChange}
            aria-label="Tabs"
          >
            <Tab sx={{ textTransform: "none" }} label="Chờ Duyệt" value="1" />
            <Tab sx={{ textTransform: "none" }} label="Đã Duyệt" value="2" />
            <Tab sx={{ textTransform: "none" }} label="Bị Từ Chối" value="3" />
            <Tab sx={{ textTransform: "none" }} label="Tất Cả" value="4" />
          </TabList>
        </Box>

        {/* Tab Chờ Duyệt */}
        <TabPanel sx={{ padding: 0 }} value="1">
          <RecruiterTable
          // recruiters={filteredRecruiters("Chờ duyệt")}
          />
        </TabPanel>

        {/* Tab Đã Duyệt */}
        <TabPanel sx={{ padding: 0 }} value="2">
          <RecruiterTable
          // recruiters={filteredRecruiters("Đã duyệt")}
          />
        </TabPanel>

        {/* Tab Bị Từ Chối */}
        <TabPanel sx={{ padding: 0 }} value="3">
          <RecruiterTable
          // recruiters={filteredRecruiters("Bị từ chối")}
          />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="4">
          <RecruiterTable
          // recruiters={filteredRecruiters("Bị từ chối")}
          />
        </TabPanel>
      </TabContext>
      {/* Modal xem chi tiết nhà tuyển dụng */}
    </Box>
  );
};

const recruiters = [
  { name: "name", MST: "22", email: "email", status: "status" },
];
// Component hiển thị bảng
const RecruiterTable = () => {
  // { recruiters }
  const [recruiters, setRecruiters] = useState(initialRecruiters);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  // Xử lý duyệt tài khoản
  const handleApprove = (id) => {
    setRecruiters((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Đã duyệt" } : r))
    );
  };

  // Xử lý xóa tài khoản
  const handleDelete = (id) => {
    setRecruiters((prev) => prev.filter((r) => r.id !== id));
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
            <TableCell>Email</TableCell>
            <TableCell>Trạng Thái</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recruiters.length > 0 ? (
            recruiters.map((recruiter, index) => (
              <TableRow key={recruiter.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{recruiter.name}</TableCell>
                <TableCell>{recruiter.email}</TableCell>
                <TableCell>{recruiter.status}</TableCell>
                <TableCell>
                  {recruiter.status === "Chờ duyệt" && (
                    <IconButton
                      color="success"
                      onClick={() => handleApprove(recruiter.id)}
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
        <DialogTitle>Chi Tiết Nhà Tuyển Dụng</DialogTitle>
        <DialogContent>
          {selectedRecruiter && (
            <div>
              <p>
                <strong>Tên Công Ty:</strong> {selectedRecruiter.name}
              </p>
              <p>
                <strong>Mã số thuế:</strong> {selectedRecruiter.MST}
              </p>
              <p>
                <strong>Email:</strong> {selectedRecruiter.email}
              </p>
              <p>
                <strong>Trạng Thái:</strong> {selectedRecruiter.status}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default Employers;
