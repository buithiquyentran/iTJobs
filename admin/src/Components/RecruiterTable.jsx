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
import { CheckCircle, Delete, Visibility } from "@mui/icons-material";
import BlockIcon from "@mui/icons-material/Block";

import userService from "~/services/user.service";
const RecruiterTable = ({ filters }) => {
  // Component hiển thị bảng

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

export default RecruiterTable;
