import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
} from '@mui/material';

// Dữ liệu mẫu ứng viên
const initialApplicants = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        jobTitle: 'Lập trình viên Fullstack',
        status: 'pending', // pending: chờ duyệt, accepted: đã duyệt, rejected: bị từ chối
        resume: 'https://example.com/cv/nguyenvana.pdf',
        rejectReason: '',
    },
    {
        id: 2,
        name: 'Trần Thị B',
        jobTitle: 'Data Scientist',
        status: 'rejected',
        resume: 'https://example.com/cv/tranthib.pdf',
        rejectReason: 'Chưa đủ kinh nghiệm',
    },
];

const ManageApplicants = () => {
    const [applicants, setApplicants] = useState(initialApplicants);
    const [open, setOpen] = useState(false);
    const [currentApplicant, setCurrentApplicant] = useState(null);

    // Mở form chi tiết ứng viên
    const handleOpen = (applicant) => {
        setCurrentApplicant(applicant);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    // Cập nhật trạng thái ứng viên
    const handleUpdateStatus = (status) => {
        setApplicants((prev) =>
            prev.map((app) =>
                app.id === currentApplicant.id
                    ? { ...app, status, rejectReason: status === 'rejected' ? currentApplicant.rejectReason : '' }
                    : app,
            ),
        );
        handleClose();
    };

    return (
        <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '260px', marginTop: '64px' }}>
            <Typography variant="h4" gutterBottom>
                Quản lý Ứng viên
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Họ Tên</TableCell>
                            <TableCell>Vị trí ứng tuyển</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicants.map((applicant) => (
                            <TableRow key={applicant.id}>
                                <TableCell>{applicant.name}</TableCell>
                                <TableCell>{applicant.jobTitle}</TableCell>
                                <TableCell>
                                    {applicant.status === 'rejected'
                                        ? `Từ chối: ${applicant.rejectReason}`
                                        : applicant.status}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(applicant)}>Xem</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog chi tiết ứng viên */}
            {currentApplicant && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Chi tiết Ứng viên</DialogTitle>
                    <DialogContent>
                        <Typography>Tên: {currentApplicant.name}</Typography>
                        <Typography>Vị trí: {currentApplicant.jobTitle}</Typography>
                        <a href={currentApplicant.resume} target="_blank" rel="noopener noreferrer">
                            Xem CV
                        </a>
                        {currentApplicant.status === 'pending' && (
                            <TextField
                                label="Lý do từ chối (nếu có)"
                                fullWidth
                                margin="normal"
                                value={currentApplicant.rejectReason}
                                onChange={(e) =>
                                    setCurrentApplicant((prev) => ({
                                        ...prev,
                                        rejectReason: e.target.value,
                                    }))
                                }
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Đóng</Button>
                        {currentApplicant.status === 'pending' && (
                            <>
                                <Button onClick={() => handleUpdateStatus('accepted')} color="primary">
                                    Duyệt
                                </Button>
                                <Button onClick={() => handleUpdateStatus('rejected')} color="error">
                                    Từ chối
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ManageApplicants;
