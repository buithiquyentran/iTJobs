import React, { useState, useEffect } from 'react';
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
    Select,
    FormControl,
    InputLabel,
    Chip,
    MenuItem,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icon con mắt

import cvService from '~/UserDashBoard/services/cv.service';
import capBacService from '~/UserDashBoard/services/capBac.service';
import kiNangService from '~/UserDashBoard/services/kiNang.service';
import authService from '~/UserDashBoard/services/auth.service';
import uploadService from '~/UserDashBoard/services/upload.service';
import nguoiLaoDongService from '~/EmployerDashBoard/services/nguoiLaoDong.service';
const ManageCV = () => {
    const [user, setUser] = useState({});

    const [cvs, setCVs] = useState([]);
    const [cvUploads, setCvUploads] = useState([]);

    const [selectedCvType, setSelectedCvType] = useState('all');

    useEffect(() => {
        try {
            const fetchData = async () => {
                const userData = await authService.getUserInfo();
                setUser(userData);
                setCvUploads(userData.CV_LINK || []);
                const response = await cvService.findByMA_NLD(userData.MA_NLD);
                // console.log(response);
                setCVs(response);

                // const response1 = await capBacService.getAll();
                // setJobLevels(response1);

                // const response2 = await kiNangService.getAll();
                // setSkills(response2);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);
    const filterCV =
        selectedCvType === 'all' ? [...cvs, ...cvUploads] : selectedCvType === 'upload-CV' ? cvUploads : cvs;
    // Xóa CV
    const handleDelete = async (MA_CV, TEN_CV, CV_LINK) => {
        let confirm = window.confirm(`Bạn có chắc chắn muốn xóa CV ${TEN_CV}`);
        if (confirm) {
            try {
                if (MA_CV) {
                    const response = await cvService.delete(MA_CV);
                    setCVs(cvs.filter((cv) => cv.MA_CV !== MA_CV));
                } else {
                    let updateCV = await nguoiLaoDongService.get(user.MA_NLD);
                    const filterLinkCV = user.CV_LINK.filter((item) => item.CV_LINK !== CV_LINK);
                    setCvUploads(filterLinkCV);
                    const response = await nguoiLaoDongService.update(user.MA_NLD, {
                        ...updateCV,
                        CV_LINK: filterLinkCV,
                    });
                }
            } catch (error) {
                alert('Lỗi khi xóa CV');
            }
        }
    };

    const handleCVUpload = async (e) => {
        const file = e.target.files[0];
        // console.log(file);
        if (file) {
            try {
                const form = new FormData();
                form.append('cv', file);
                const response = await uploadService.uploadCV(user.MA_NLD, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Xác định kiểu gửi
                    },
                });
                // console.log(response);
                if (response) {
                    // console.log(response?.newCV);
                    const newCV = { CV_LINK: response?.CV_LINK, TEN_CV: response?.TEN_CV };
                    console.log([...cvUploads, newCV]);
                    setCvUploads([...cvUploads, newCV]);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <Box sx={{ width: '100%', padding: 3 }}>
            <h2>Quản lý CV</h2>
            <Box display="flex" gap={2}>
                <Select value={selectedCvType} onChange={(e) => setSelectedCvType(e.target.value)} displayEmpty>
                    <MenuItem value="all">Tất cả CV</MenuItem>

                    <MenuItem value="upload-CV">Upload-CV</MenuItem>
                    <MenuItem value="tool-CV">Tool-CV</MenuItem>
                </Select>
                <Button
                    sx={{
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            color: 'white',
                        },
                        height: '40px',
                        alignSelf: 'center',
                    }}
                    variant="contained"
                    // color="primary"
                    component={Link}
                    to={`/user/view-cv/?isEditting=true`}
                >
                    Thêm CV
                </Button>
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            color: 'white',
                        },
                        height: '40px',
                        alignSelf: 'center',
                    }}
                >
                    Tải lên CV
                    <input type="file" hidden onChange={handleCVUpload} />
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên CV</TableCell>
                            <TableCell>Kỹ năng</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterCV?.map((cv, index) => (
                            <TableRow key={cv.MA_CV}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{cv?.TEN_CV}</TableCell>

                                <TableCell>{cv.KiNangs?.map((item) => item).join(', ')}</TableCell>

                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        component={Link}
                                        to={cv.CV_LINK ? cv.CV_LINK : `/user/view-cv/${cv.MA_CV}?isEditting=true`}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(cv.MA_CV, cv.TEN_CV, cv.CV_LINK)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ManageCV;
