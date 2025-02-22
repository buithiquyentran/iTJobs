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
const Employees = () => {
  const initialRecruiters = [
    {
      id: 1,
      MST: "22",
      employer: "employer",
      name: "Công ty ABC",
      email: "abc@gmail.com",
      status: "Chờ duyệt",
    },
  ];
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
            <TableCell>Tên Tin Tuyển Dụng</TableCell>
            <TableCell>Tên Nhà Tuyển Dụng</TableCell>
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
                <TableCell>{recruiter.employer}</TableCell>
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
                  {/* <IconButton
                    color="error"
                    onClick={() => handleDelete(recruiter.id)}
                  >
                    <Delete />
                  </IconButton> */}
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

export default Employees;
