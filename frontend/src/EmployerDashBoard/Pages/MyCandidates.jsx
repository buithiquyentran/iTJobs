import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    Chip,
    CardMedia,
} from '@mui/material';
import { Cancel, CheckCircle } from '@mui/icons-material';
import authService from '~/EmployerDashBoard/services/auth.service';
import tinTuyenDungService from '../services/tinTuyenDung.service';
import ungTuyenService from '../services/ungTuyen.service';
import thongBaoService from '../services/thongBao.service';
const MyCandidates = () => {
    const [user, setUser] = useState({});

    const [jobs, seJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentApplicant, setCurrentApplicant] = useState({});
    const [filterStatus, setFilterStatus] = useState(2);
    const [selectedJob, setSelectedJob] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [LY_DO_TU_CHOI, setRejectReason] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await authService.getUserInfo();
                setUser(userData);
                const response = await tinTuyenDungService.getByMA_NTD(userData.MA_NTD);
                seJobs(response);
                const ungTuyen = await ungTuyenService.getByMA_NTD(userData.MA_NTD);
                setApplicants(ungTuyen);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    // Mở form chi tiết ứng viên
    const handleOpen = (applicant) => {
        setCurrentApplicant(applicant);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    // Cập nhật trạng thái ứng viên
    const handleUpdateStatus = async (TRANG_THAI) => {
        const updateApplicant = {
            ...currentApplicant,
            TRANG_THAI: TRANG_THAI,
            LY_DO_TU_CHOI: TRANG_THAI === -1 ? currentApplicant.LY_DO_TU_CHOI : '',
        };
        // console.log(updateApplicant);
        // console.log(currentApplicant.SDT, currentApplicant.MA_TTD);
        const response1 = await ungTuyenService.update(currentApplicant.SDT, currentApplicant.MA_TTD, updateApplicant);
        let noidung = '';
        if (TRANG_THAI == 1)
            noidung = `Hồ sơ của bạn ứng tuyển vào "${currentApplicant.TinTuyenDung.TEN_TTD}" đã được duyệt!`;
        else {
            noidung = `Hồ sơ của bạn ứng tuyển vào "${currentApplicant.TinTuyenDung.TEN_TTD}" bị từ chối!`;
            if (currentApplicant.LY_DO_TU_CHOI) {
                noidung += `Lí do:  ${currentApplicant.LY_DO_TU_CHOI}`;
            }
        }

        const thongBaoInfo = { SDT: currentApplicant.SDT, NOI_DUNG: noidung };
        // console.log(thongBaoInfo);
        const response2 = await thongBaoService.create(thongBaoInfo);
        if (response1 && response2) handleClose();
        setApplicants((prev) =>
            prev.map((app) =>
                app.MA_NLD === currentApplicant.MA_NLD
                    ? {
                          ...app,
                          TRANG_THAI,
                          LY_DO_TU_CHOI: TRANG_THAI === -1 ? currentApplicant.LY_DO_TU_CHOI : '',
                      }
                    : app,
            ),
        );
    };
    const handleApprove = (MA_NLD) => {
        setApplicants((prev) => prev.map((c) => (c.MA_NLD === MA_NLD ? { ...c, TRANG_THAI: 'approved' } : c)));
    };

    const handleOpenRejectDialog = (candidate) => {
        setRejectingCandidate(candidate);
        setOpenDialog(true);
    };

    const handleReject = () => {
        setApplicants((prev) =>
            prev.map((c) =>
                c.MA_NLD === rejectingCandidate.MA_NLD
                    ? { ...c, TRANG_THAI: 'rejected', LY_DO_TU_CHOI: LY_DO_TU_CHOI }
                    : c,
            ),
        );
        setOpenDialog(false);
        // setRejectReason('');
    };
    return (
        <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '260px', marginTop: '64px' }}>
            <Typography variant="h4" gutterBottom>
                Quản lý Ứng viên
            </Typography>
            {/* Chọn tin tuyển dụng */}
            <Box display="flex" gap={2} mb={3}>
                <Select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    displayEmpty
                    sx={{ mb: 3 }}
                >
                    <MenuItem value="">Tất cả tin tuyển dụng</MenuItem>
                    {jobs?.map((job) => (
                        <MenuItem key={job.MA_TTD} value={job.MA_TTD}>
                            {job.TEN_TTD}
                        </MenuItem>
                    ))}
                </Select>
                <Select sx={{ mb: 3 }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <MenuItem value="2">Tất cả trạng thái</MenuItem>
                    <MenuItem value="0">Chờ duyệt</MenuItem>
                    <MenuItem value="1">Đã duyệt</MenuItem>
                    <MenuItem value="-1">Bị từ chối</MenuItem>
                </Select>
            </Box>

            {/* Danh sách ứng viên */}
            {applicants.map(
                (candidate) =>
                    (filterStatus == 2 || candidate.TRANG_THAI == filterStatus) &&
                    (!selectedJob || candidate.MA_TTD === selectedJob) && (
                        <Box
                            key={candidate.MA_NLD}
                            sx={{ display: 'flex', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}
                        >
                            <Box>
                                <Typography variant="h6">{candidate.HO_TEN}</Typography>
                                <Typography>
                                    <b>Tin ứng tuyển: </b>
                                    {jobs.find((job) => job.MA_TTD == candidate.MA_TTD)?.TEN_TTD}
                                </Typography>
                                <Typography>
                                    <b>Ngày ứng tuyển: </b>
                                    {candidate.NGAY_UNG_TUYEN.split('T')[0]}
                                </Typography>
                                <Typography>
                                    <b>Giới thiệu: </b>
                                    {candidate.LOI_NHAN}
                                </Typography>

                                <Button onClick={() => handleOpen(candidate)}>Xem chi tiết</Button>
                                {candidate.TRANG_THAI == 1 && (
                                    <Chip label="Đã duyệt" color="success" icon={<CheckCircle />} />
                                )}
                                {candidate.TRANG_THAI == 0 && <Chip label="Chờ duyệt" color="warning" />}
                                {candidate.TRANG_THAI == -1 && (
                                    <Chip label="Bị từ chối" color="error" icon={<Cancel />} />
                                )}

                                {candidate.TRANG_THAI == -1 && (
                                    <Typography color="error">Lý do từ chối: {candidate.LY_DO_TU_CHOI}</Typography>
                                )}
                            </Box>
                        </Box>
                    ),
            )}

            {/* Dialog chi tiết ứng viên */}
            {currentApplicant && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Chi tiết Ứng viên</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {' '}
                            <b>Tên: </b>
                            {currentApplicant.HO_TEN}
                        </Typography>
                        <Typography>
                            <b>Vị trí: </b>
                            {currentApplicant.TinTuyenDung?.TEN_TTD}
                        </Typography>
                        <Typography>
                            <b>Email: </b>b@gmail.com{' '}
                        </Typography>
                        <Typography>
                            <b>SDT: </b>09999999999{' '}
                        </Typography>
                        <Typography>
                            <b>Giới thiệu: </b>
                            {currentApplicant.LOI_NHAN}{' '}
                        </Typography>

                        {currentApplicant.CV_LINK ? (
                            <Button>
                                <a href={currentApplicant.CV_LINK} target="_blank" rel="noopener noreferrer">
                                    Xem CV
                                </a>
                            </Button>
                        ) : (
                            <Button
                                target="_blank"
                                component={Link}
                                to={`/user/view-cv/${currentApplicant.MA_CV}?isEditting=false`}
                            >
                                Xem CV
                            </Button>
                        )}
                        {currentApplicant.TRANG_THAI === 0 && (
                            <TextField
                                label="Lý do từ chối (nếu có)"
                                fullWidth
                                margin="normal"
                                value={currentApplicant.LY_DO_TU_CHOI ? currentApplicant.LY_DO_TU_CHOI : ''}
                                onChange={(e) =>
                                    setCurrentApplicant((prev) => ({
                                        ...prev,
                                        LY_DO_TU_CHOI: e.target.value,
                                    }))
                                }
                            />
                        )}
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: 'space-between' }}>
                        {currentApplicant.TRANG_THAI === 0 && (
                            <>
                                <Button sx={{ padding: '12px' }} onClick={() => handleUpdateStatus(-1)} color="error">
                                    Từ chối
                                </Button>
                                <Button sx={{ padding: '12px' }} onClick={() => handleUpdateStatus(1)} color="primary">
                                    Duyệt
                                </Button>
                            </>
                        )}
                        <Button sx={{ padding: '12px' }} onClick={handleClose}>
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Dialog nhập lý do từ chối */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Nhập lý do từ chối</DialogTitle>
                <DialogContent>
                    <textarea
                        value={LY_DO_TU_CHOI}
                        onChange={(e) => setRejectReason(e.target.value)}
                        style={{ width: '100%', minHeight: '80px' }}
                        placeholder="Nhập lý do từ chối..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
                    <Button onClick={handleReject} color="error">
                        Xác nhận từ chối
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyCandidates;
