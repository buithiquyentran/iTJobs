import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icon con mắt
const initialCVs = [
    { id: 1, tenCV: 'Fullstack Developer', maKN: 'ReactJS, NodeJS', maCB: 'Senior' },
    { id: 2, tenCV: 'Backend Developer', maKN: 'NodeJS, MySQL', maCB: 'Junior' },
];

const ManageCV = () => {
    const [cvs, setCVs] = useState(initialCVs);
    const [open, setOpen] = useState(false);
    const [cvData, setCvData] = useState({
        id: null,
        tenCV: '',
        gioiThieu: '',
        hocVan: '',
        namSinh: '',
        sdt: '',
        email: '',
        tp: '',
        duAn: '',
        github: '',
        maKN: '',
        maCB: '',
    });

    // Mở dialog
    const handleOpen = (cv = { id: null, tenCV: '', maKN: '', maCB: '' }) => {
        setCvData(cv);
        setOpen(true);
    };

    // Đóng dialog
    const handleClose = () => {
        setOpen(false);
        setCvData({ id: null, tenCV: '', maKN: '', maCB: '' });
    };

    // Lưu CV
    const handleSave = () => {
        if (cvData.id) {
            setCVs(cvs.map((cv) => (cv.id === cvData.id ? cvData : cv)));
        } else {
            setCVs([...cvs, { ...cvData, id: cvs.length + 1 }]);
        }
        handleClose();
    };

    // Xóa CV
    const handleDelete = (id) => {
        setCVs(cvs.filter((cv) => cv.id !== id));
    };

    return (
        <Box sx={{ width: '1000px', padding: 3 }}>
            <h2>Quản lý CV</h2>
            <Button
                sx={{ marginRight: 1, '&:hover': { backgroundColor: 'secondary.main', color: 'white' } }}
                variant="outlined"
                color="primary"
                onClick={() => handleOpen()}
            >
                Thêm CV
            </Button>
            <Button
                sx={{ '&:hover': { backgroundColor: 'secondary.main', color: 'white' } }}
                variant="outlined"
                color="primary"
                onClick={() => handleOpen()}
            >
                Tải lên CV
            </Button>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên CV</TableCell>
                            <TableCell>Kỹ năng</TableCell>
                            <TableCell>Cấp bậc</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cvs.map((cv) => (
                            <TableRow key={cv.id}>
                                <TableCell>{cv.id}</TableCell>
                                <TableCell>{cv.tenCV}</TableCell>
                                <TableCell>{cv.maKN}</TableCell>
                                <TableCell>{cv.maCB}</TableCell>

                                <TableCell>
                                    <IconButton color="primary" component={Link} to={'/user/view-cv'}>
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => handleOpen(cv)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(cv.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog thêm/sửa CV */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{cvData.id ? 'Chỉnh sửa CV' : 'Thêm CV'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Tên CV"
                        fullWidth
                        margin="dense"
                        value={cvData.tenCV}
                        onChange={(e) => setCvData({ ...cvData, tenCV: e.target.value })}
                    />
                    <TextField
                        label="Giới thiệu"
                        fullWidth
                        margin="dense"
                        value={cvData.gioiThieu}
                        onChange={(e) => setCvData({ ...cvData, gioiThieu: e.target.value })}
                    />
                    <TextField
                        label="Mục tiêu nghề nghiệp "
                        fullWidth
                        margin="dense"
                        value={cvData.gioiThieu}
                        onChange={(e) => setCvData({ ...cvData, gioiThieu: e.target.value })}
                    />
                    <TextField
                        label="Chứng chỉ "
                        fullWidth
                        margin="dense"
                        value={cvData.gioiThieu}
                        onChange={(e) => setCvData({ ...cvData, gioiThieu: e.target.value })}
                    />
                    <TextField
                        label="Kinh nghiệm"
                        fullWidth
                        margin="dense"
                        value={cvData.gioiThieu}
                        onChange={(e) => setCvData({ ...cvData, gioiThieu: e.target.value })}
                    />

                    <TextField
                        label="Học vấn"
                        fullWidth
                        margin="dense"
                        value={cvData.hocVan}
                        onChange={(e) => setCvData({ ...cvData, hocVan: e.target.value })}
                    />
                    <TextField
                        label="Năm sinh"
                        fullWidth
                        margin="dense"
                        value={cvData.namSinh}
                        onChange={(e) => setCvData({ ...cvData, namSinh: e.target.value })}
                    />
                    <TextField
                        label="SDT"
                        fullWidth
                        margin="dense"
                        value={cvData.sdt}
                        onChange={(e) => setCvData({ ...cvData, sdt: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="dense"
                        value={cvData.email}
                        onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                    />
                    <TextField
                        label="Dự án"
                        fullWidth
                        margin="dense"
                        value={cvData.duAn}
                        onChange={(e) => setCvData({ ...cvData, duAn: e.target.value })}
                    />
                    <TextField
                        label="Github"
                        fullWidth
                        margin="dense"
                        value={cvData.github}
                        onChange={(e) => setCvData({ ...cvData, github: e.target.value })}
                    />

                    <TextField
                        label="Kỹ năng"
                        fullWidth
                        margin="dense"
                        value={cvData.maKN}
                        onChange={(e) => setCvData({ ...cvData, maKN: e.target.value })}
                    />
                    <TextField
                        label="Cấp bậc"
                        fullWidth
                        margin="dense"
                        value={cvData.maCB}
                        onChange={(e) => setCvData({ ...cvData, maCB: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageCV;
