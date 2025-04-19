import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Button,
} from '@mui/material';

// Dữ liệu demo: Lịch sử ứng tuyển và đăng tin tuyển dụng
const demoHistory = {
    applications: [
        {
            id: 'A001',
            TEN_TTD: 'Lập trình viên Frontend',
            HO_TEN: 'Nguyễn Văn A',
            TRANG_THAI: 'approved',
            NGAY_UNG_TUYEN: '2023-10-15',
            decisionDate: '2023-10-20',
            LY_DO_TU_CHOI: '',
        },
        {
            id: 'A002',
            TEN_TTD: 'Chuyên viên Marketing',
            HO_TEN: 'Trần Thị B',
            TRANG_THAI: 'rejected',
            NGAY_UNG_TUYEN: '2023-10-10',
            decisionDate: '2023-10-18',
            LY_DO_TU_CHOI: 'Không phù hợp với yêu cầu',
        },
        {
            id: 'A003',
            TEN_TTD: 'Tester',
            HO_TEN: 'Lê Văn C',
            TRANG_THAI: 'approved',
            NGAY_UNG_TUYEN: '2023-09-25',
            decisionDate: '2023-10-01',
            LY_DO_TU_CHOI: '',
        },
    ],
    jobPosts: [
        {
            id: 'J001',
            title: 'Lập trình viên Backend',
            postedDate: '2023-09-10',
            TRANG_THAI: 'approved',
            LY_DO_TU_CHOI: '',
        },
        {
            id: 'J002',
            title: 'Chuyên viên Nhân sự',
            postedDate: '2023-08-20',
            TRANG_THAI: 'rejected',
            LY_DO_TU_CHOI: 'Mô tả công việc chưa rõ ràng',
        },
        {
            id: 'J003',
            title: 'UI/UX Designer',
            postedDate: '2023-09-30',
            TRANG_THAI: 'pending',
            LY_DO_TU_CHOI: '',
        },
    ],
};
import authService from '~/EmployerDashBoard/services/auth.service';

import tinTuyenDungService from '../services/tinTuyenDung.service';
import ungTuyenService from '../services/ungTuyen.service';
const MyHistory = () => {
    const [jobs, seJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [filter, setFilter] = useState('applications'); // Lọc giữa "applications" và "jobPosts"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await authService.getUserInfo();

                const response = await tinTuyenDungService.getByMA_NTD(user.MA_NTD);
                seJobs(response);
                const ungTuyen = await ungTuyenService.getByMA_NTD(user.MA_NTD);
                setApplicants(ungTuyen);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const getStatusColor = (TRANG_THAI) => {
        switch (TRANG_THAI) {
            case 'approved':
                return 'green';
            case 'rejected':
                return 'red';
            case 'pending':
                return 'orange';
            default:
                return 'black';
        }
    };

    return (
        <Box sx={{ flexGrow: 1, paddig: '20px', marginLeft: '260px', marginTop: '64px' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                📜 Lịch sử tuyển dụng
            </Typography>

            {/* Bộ lọc */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <MenuItem value="applications">Lịch sử ứng viên</MenuItem>
                    <MenuItem value="jobPosts">Lịch sử đăng tin</MenuItem>
                </Select>
                <Button variant="outlined" onClick={() => alert('Xuất file Excel')}>
                    📊 Xuất Excel
                </Button>
            </Box>

            {/* Bảng hiển thị lịch sử */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        {filter === 'applications' ? (
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Ứng viên</TableCell>
                                <TableCell>Công việc</TableCell>
                                <TableCell>Ngày ứng tuyển</TableCell>
                                <TableCell>Ngày quyết định</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Lý do (nếu từ chối)</TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell>Mã tin</TableCell>
                                <TableCell>Vị trí tuyển dụng</TableCell>
                                <TableCell>Ngày đăng</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Lý do từ chối (nếu có)</TableCell>
                            </TableRow>
                        )}
                    </TableHead>
                    <TableBody>
                        {filter === 'applications'
                            ? applicants?.map((item, index) => (
                                  <TableRow key={index + 1}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>{item.HO_TEN}</TableCell>
                                      <TableCell>{item.TinTuyenDung.TEN_TTD}</TableCell>
                                      <TableCell>{item.NGAY_UNG_TUYEN.split('T')[0]}</TableCell>
                                      <TableCell>{item.decisionDate}</TableCell>
                                      <TableCell sx={{ color: getStatusColor(item.TRANG_THAI) }}>
                                          {item.TRANG_THAI === 'approved'
                                              ? '✅ Đã duyệt'
                                              : item.TRANG_THAI === 'rejected'
                                              ? '❌ Từ chối'
                                              : '⏳ Đang chờ'}
                                      </TableCell>
                                      <TableCell>{item.LY_DO_TU_CHOI || '—'}</TableCell>
                                  </TableRow>
                              ))
                            : jobs?.map((item) => (
                                  <TableRow key={item.MA_TTD}>
                                      <TableCell>{item.MA_TTD}</TableCell>
                                      <TableCell>{item.TEN_TTD}</TableCell>
                                      <TableCell>{item.NGAY}</TableCell>
                                      <TableCell sx={{ color: getStatusColor(item.STATUS) }}>
                                          {item.STATUS === 1
                                              ? '✅ Đã duyệt'
                                              : item.STATUS === -1
                                              ? '❌ Từ chối'
                                              : '⏳ Đang chờ'}
                                      </TableCell>
                                      <TableCell>{item.LY_DO_TU_CHOI || '—'}</TableCell>
                                  </TableRow>
                              ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MyHistory;
