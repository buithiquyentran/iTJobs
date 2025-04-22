import { useEffect, useState, useRef } from 'react';
import moment from 'moment';

import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
    Chip,
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@mui/material';
import tinTuyenDungService from '../services/tinTuyenDung.service';
import kiNangService from '../services/kiNang.service';
import capBacService from '../services/capBac.service';
import loaiHinhService from '../services/loaiHinh.service';
import loaiHopDongService from '../services/loaiHopDong.service';
import authService from '../services/auth.service';
import followService from '../services/follow.service';
import thongBaoService from '../services/thongBao.service';
const MyRecruiments = () => {
    const [jobs, setJobs] = useState([]);
    const [MA_NTD, setMA_NTD] = useState(null);
    const [user, setUser] = useState(null);

    const [open, setOpen] = useState(false);
    const [editingJob, setEditingJob] = useState({});
    const [statusFilter, setStatusFilter] = useState(2);

    const [types, setTypes] = useState([]);
    const [skills, setSkills] = useState([]);
    const [levels, setLevels] = useState([]);
    const [contracts, setContracts] = useState([]);

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedContract, setSelectedContract] = useState({});
    const [selectedType, setSelectedType] = useState('');

    const tenTTDRef = useRef(null);
    const diaChiRef = useRef(null);
    const diaChiCuTheRef = useRef(null);
    const maKNRef = useRef(null);
    const maCBRef = useRef(null);
    const loaiHinhRef = useRef(null);
    const loaiHDRef = useRef(null);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const kiNang = await kiNangService.getAll();
                setSkills(kiNang);
                const loaiHinh = await loaiHinhService.getAll();
                setTypes(loaiHinh);
                const capBac = await capBacService.getAll();
                setLevels(capBac);
                const loaiHopDong = await loaiHopDongService.getAll();
                setContracts(loaiHopDong);
                // console.log(loaiHopDong);
                const userData = await authService.getUserInfo();
                setUser(userData);
                setMA_NTD(userData?.MA_NTD);
                const tinTuyenDung = await tinTuyenDungService.getByMA_NTD(userData?.MA_NTD);
                setJobs(
                    tinTuyenDung.map((item) => ({
                        ...item,
                        MA_KN: item.KiNangs?.map((item) => item.MA_KN) || [],
                        MA_CB: item.CapBacs?.map((item) => item.MA_CB) || [],
                    })),
                );
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    // Mở dialog thêm/sửa
    const handleOpen = (job) => {
        if (!job) {
            setEditingJob({
                TEN_TTD: '',
                DIA_CHI: '',
                MUC_LUONG: null,
                DIA_CHI_CU_THE: [],
                TRACH_NHIEM: [],
                CHUYEN_MON: [],
                NICE_TO_HAVE: [],
                PHUC_LOI: [],
                QUI_TRINH_PV: [],
                MA_KN: [],
                MA_CB: [],
                MA_LOAI_HINH: null,
                MA_LOAI_HD: null,
            });
            setSelectedSkills([]);
            setSelectedLevels([]);
            setSelectedContract('');
            setSelectedType('');
        } else {
            setEditingJob({
                ...job,
                DIA_CHI_CU_THE: job.DIA_CHI_CU_THE?.join('\n') || [],
                TRACH_NHIEM: job.TRACH_NHIEM?.join('\n') || [],
                CHUYEN_MON: job.CHUYEN_MON?.join('\n') || [],
                NICE_TO_HAVE: job.NICE_TO_HAVE?.join('\n') || [],
                PHUC_LOI: job.PHUC_LOI?.join('\n') || [],
                QUI_TRINH_PV: job.QUI_TRINH_PV?.join('\n') || [],
            });
            setSelectedSkills(job.KiNangs?.map((item) => item.MA_KN) || []);
            setSelectedLevels(job.CapBacs?.map((item) => item.MA_CB) || []);
            setSelectedContract(job.LoaiHopDong);
            setSelectedType(job.LoaiHinh);
        }

        setOpen(true);
    };

    const handleClose = () => setOpen(false);
    const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split('T')[0];
    };
    // Xử lý form thay đổi
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingJob((prev) => ({ ...prev, [name]: value }));
    };
    const validateJobForm = () => {
        const newErrors = {};

        if (!editingJob.TEN_TTD || editingJob.TEN_TTD.trim().length > 255) {
            if (editingJob.TEN_TTD.trim().length > 255) {
                newErrors.TEN_TTD = 'Tên tin tuyển dụng không được quá 255 ký tự';
            } else newErrors.TEN_TTD = 'Vui lòng nhập tên tin tuyển dụng';
        } else if (!editingJob.DIA_CHI || editingJob.DIA_CHI.trim() === '') {
            newErrors.DIA_CHI = 'Vui lòng nhập trụ sở chính công ty';
        } else if (!editingJob.DIA_CHI_CU_THE || editingJob.DIA_CHI_CU_THE.length === 0) {
            newErrors.DIA_CHI_CU_THE = 'Vui lòng chọn địa chỉ cụ thể';
        } else if (!editingJob.MA_KN || editingJob.MA_KN.length === 0) {
            newErrors.MA_KN = 'Vui lòng chọn kĩ năng';
        } else if (!editingJob.MA_CB || editingJob.MA_CB.length === 0) {
            newErrors.MA_CB = 'Vui lòng chọn cấp bậc';
        } else if (!editingJob.MA_LOAI_HINH) {
            newErrors.MA_LOAI_HINH = 'Vui lòng chọn loại hình';
        } else if (!editingJob.MA_LOAI_HD) {
            newErrors.MA_LOAI_HD = 'Vui lòng chọn loại hợp đồng';
        }

        setErrors(newErrors);

        // Focus vào lỗi đầu tiên nếu có
        if (newErrors.TEN_TTD) tenTTDRef.current?.focus();
        else if (newErrors.DIA_CHI) diaChiRef.current?.focus();
        else if (newErrors.DIA_CHI_CU_THE) diaChiCuTheRef.current?.focus();
        else if (newErrors.MA_KN) maKNRef.current?.focus();
        else if (newErrors.MA_CB) maCBRef.current?.focus();
        else if (newErrors.MA_LOAI_HINH) loaiHinhRef.current?.focus();
        else if (newErrors.MA_LOAI_HD) loaiHDRef.current?.focus();

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        const updatedJob = { ...editingJob, MA_NTD: MA_NTD };
        // console.log(editingJob);
        if (typeof updatedJob.DIA_CHI_CU_THE === 'string')
            updatedJob.DIA_CHI_CU_THE = updatedJob.DIA_CHI_CU_THE.split('\n');
        if (typeof updatedJob.TRACH_NHIEM === 'string') updatedJob.TRACH_NHIEM = updatedJob.TRACH_NHIEM.split('\n');
        if (typeof updatedJob.CHUYEN_MON === 'string') updatedJob.CHUYEN_MON = updatedJob.CHUYEN_MON.split('\n');
        if (typeof updatedJob.NICE_TO_HAVE === 'string') updatedJob.NICE_TO_HAVE = updatedJob.NICE_TO_HAVE.split('\n');
        if (typeof updatedJob.PHUC_LOI === 'string') updatedJob.PHUC_LOI = updatedJob.PHUC_LOI.split('\n');
        if (typeof updatedJob.QUI_TRINH_PV === 'string') updatedJob.QUI_TRINH_PV = updatedJob.QUI_TRINH_PV.split('\n');
        setEditingJob(updatedJob);
        // console.log(updatedJob); // Log đúng dữ liệu sau khi split

        if (!validateJobForm()) {
            return; // có lỗi dừng lại
        }
        if (!updatedJob.MUC_LUONG || updatedJob.MUC_LUONG.trim() === '') {
            delete updatedJob.MUC_LUONG;
        }
        // Xử lý lưu:
        try {
            if (updatedJob.MA_TTD) {
                const response = await tinTuyenDungService.update(updatedJob.MA_TTD, updatedJob);
                if (response) {
                    // Thong bao
                    let noidung = `${user.TEN_NTD} chỉnh sửa tin tuyển dụng "${
                        updatedJob.TEN_TTD
                    }" vào lúc ${moment().format('DD/MM/YYYY HH:mm:ss')} !`;
                    console.log(noidung);
                    const followers = await followService.getByMA_NTD(user.MA_NTD);
                    for (const follower of followers) {
                        await thongBaoService.create({
                            SDT: follower.NguoiLaoDong.SDT,
                            NOI_DUNG: noidung,
                        });
                    }
                    handleClose();
                }
            } else {
                const response = await tinTuyenDungService.create(updatedJob);
                if (response) {
                    let noidung = `${user.TEN_NTD} đã thêm tin tuyển dụng mới"${
                        updatedJob.TEN_TTD
                    }" vào lúc ${moment().format('DD/MM/YYYY HH:mm:ss')} !`;
                    console.log(noidung);
                    const followers = await followService.getByMA_NTD(user.MA_NTD);
                    for (const follower of followers) {
                        await thongBaoService.create({
                            MA_NLD: follower.MA_NLD,
                            NOI_DUNG: noidung,
                        });
                    }
                    handleClose();
                }
            }
        } catch (error) {
            alert('Lỗi khi tạo tin tuyển dụng. Vui long thử lại');
            console.log(error);
        }
    };

    // Xóa tin tuyển dụng
    const handleDelete = async (MA_TTD, TEN_TTD) => {
        try {
            const confirm = window.confirm(`Bạn muốn xóa tin tuyển dụng ${TEN_TTD}`);

            if (confirm) {
                setJobs(jobs.filter((job) => job.MA_TTD !== MA_TTD)); 
                return await tinTuyenDungService.delete(MA_TTD);
            }
        } catch (error) {
            alert('Lỗi khi xóa');
        }
    };
    const handleChangeSkill = (event) => {
        setSelectedSkills(event.target.value);
        setEditingJob({ ...editingJob, MA_KN: event.target.value });
    };
    const handleChangeLevel = (event) => {
        setSelectedLevels(event.target.value);
        setEditingJob({ ...editingJob, MA_CB: event.target.value });
    };
    const handleChangeContract = (event) => {
        setSelectedContract(event.target.value);
        setEditingJob({ ...editingJob, MA_LOAI_HD: event.target.value });
        console.log(event.target.value);
    };
    const handleChangeType = (event) => {
        setSelectedContract(event.target.value);
        setEditingJob({ ...editingJob, MA_LOAI_HINH: event.target.value });
    };
    // Lọc tin theo trạng thái
    let filteredJobs = statusFilter == 2 ? jobs : jobs.filter((job) => job.STATUS == statusFilter);
    // console.log(jobs);
    return (
        <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '260px', marginTop: '64px' }}>
            <Typography variant="h4" gutterBottom>
                Quản Lý Tin Tuyển Dụng
            </Typography>
            {/* Bộ lọc trạng thái */}
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ mb: 2 }}>
                <MenuItem value="2">Tất Cả</MenuItem>
                <MenuItem value="0">Đang Chờ Duyệt</MenuItem>
                <MenuItem value="1">Đã Duyệt</MenuItem>
                <MenuItem value="-1">Bị Từ Chối</MenuItem>
                {/* 
                -1: rejected
                0: pending
                1: accepted
                2: all
                 */}
            </Select>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Thêm Tin Tuyển Dụng
            </Button>
            {/* Bảng tin tuyển dụng */}
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tiêu Đề</TableCell>
                            <TableCell>Địa Điểm</TableCell>
                            <TableCell>Mức Lương</TableCell>
                            <TableCell>Ngày Tạo</TableCell>
                            <TableCell>Trạng Thái</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredJobs?.map((job) => (
                            <TableRow key={job.MA_TTD}>
                                <TableCell>{job.TEN_TTD}</TableCell>
                                <TableCell>{job.DIA_CHI}</TableCell>
                                <TableCell>{job.MUC_LUONG}</TableCell>
                                <TableCell sx={{ minWidth: '124px' }}>{formatDate(job.NGAY)}</TableCell>

                                <TableCell>
                                    {job.STATUS === 1 ? 'Được duyệt' : job.STATUS === -1 ? 'Từ Chối' : 'Đang chờ'}
                                </TableCell>
                                <TableCell>
                                    {/* {job.STATUS === 1 && ( */}
                                    <>
                                        <Button onClick={() => handleOpen(job)}>Sửa</Button>
                                        <Button color="error" onClick={() => handleDelete(job.MA_TTD, job.TEN_TTD)}>
                                            Xóa
                                        </Button>
                                    </>
                                    {/* )} */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Form thêm/sửa */}
            <Dialog
                sx={{
                    '& .MuiDialog-paper': {
                        minWidth: '1024px',
                        maxWidth: 'none',
                        width: '1024px',
                    },
                }}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{editingJob?.MA_TTD ? 'Chỉnh Sửa Tin' : 'Thêm Tin Mới'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Tiêu Đề"
                        name="TEN_TTD"
                        value={editingJob?.TEN_TTD ? editingJob.TEN_TTD : ''}
                        onChange={(e) => {
                            handleChange(e);
                            setErrors({ ...errors, TEN_TTD: '' });
                        }}
                        inputRef={tenTTDRef}
                        error={!!errors.TEN_TTD}
                        helperText={errors.TEN_TTD}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Trụ sở chính"
                        name="DIA_CHI"
                        value={editingJob?.DIA_CHI ? editingJob.DIA_CHI : ''}
                        // onChange={handleChange}
                        onChange={(e) => {
                            handleChange(e);
                            setErrors({ ...errors, DIA_CHI: '' });
                        }}
                        inputRef={diaChiRef}
                        error={!!errors.DIA_CHI}
                        helperText={errors.DIA_CHI}
                    />

                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Địa chỉ cụ thể"
                        name="DIA_CHI_CU_THE"
                        value={editingJob?.DIA_CHI_CU_THE ? editingJob.DIA_CHI_CU_THE : ''}
                        // onChange={handleChange}
                        onChange={(e) => {
                            handleChange(e);
                            setErrors({ ...errors, DIA_CHI_CU_THE: '' });
                        }}
                        inputRef={diaChiCuTheRef}
                        error={!!errors.DIA_CHI_CU_THE}
                        helperText={errors.DIA_CHI_CU_THE}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Mức lương"
                        name="MUC_LUONG"
                        value={editingJob?.MUC_LUONG ? editingJob.MUC_LUONG : ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Trách nhiệm"
                        name="TRACH_NHIEM"
                        value={editingJob?.TRACH_NHIEM ? editingJob.TRACH_NHIEM : ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Chuyên môn"
                        name="CHUYEN_MON"
                        value={editingJob?.CHUYEN_MON ? editingJob.CHUYEN_MON : ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Nice to have"
                        name="NICE_TO_HAVE"
                        value={editingJob?.NICE_TO_HAVE ? editingJob.NICE_TO_HAVE : ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Phúc lợi"
                        name="PHUC_LOI"
                        value={editingJob?.PHUC_LOI ? editingJob.PHUC_LOI : ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        multiline
                        label="Qui trình phỏng vấn"
                        name="QUI_TRINH_PV"
                        value={editingJob?.QUI_TRINH_PV ? editingJob.QUI_TRINH_PV : ''}
                        onChange={handleChange}
                    />

                    {/* Kĩ năng */}
                    <FormControl
                        variant="outlined"
                        style={{
                            minWidth: '100%',
                            marginTop: '16px',
                            marginBottom: '8px',
                            height: '50px',
                        }}
                    >
                        <InputLabel>Kỹ năng chuyên môn</InputLabel>
                        <Select
                            multiple
                            value={selectedSkills}
                            onChange={(e) => {
                                handleChangeSkill(e);
                                setErrors({ ...errors, MA_KN: null });
                            }}
                            label="Kỹ năng chuyên môn"
                            renderValue={() => (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {selectedSkills.map((ma_kn) => {
                                        const skill = skills.find((skill) => skill.MA_KN === ma_kn);
                                        return <Chip key={ma_kn} label={skill ? skill.TEN_KN : ma_kn} />;
                                    })}
                                </div>
                            )}
                            inputRef={maKNRef}
                            error={!!errors.MA_KN}
                            helperText={errors.MA_KN}
                        >
                            {skills.map((option, index) => (
                                <MenuItem
                                    style={{
                                        backgroundColor: selectedSkills.includes(option.MA_KN)
                                            ? 'rgb(129 196 212)'
                                            : 'transparent',
                                    }}
                                    key={option.MA_KN}
                                    value={option.MA_KN}
                                >
                                    {option.TEN_KN}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Cấp bậc */}
                    <FormControl
                        variant="outlined"
                        style={{
                            minWidth: '100%',
                            marginTop: '16px',
                            marginBottom: '8px',
                            height: '50px',
                        }}
                    >
                        <InputLabel>Cấp bậc</InputLabel>
                        <Select
                            multiple
                            value={selectedLevels} // selectedLevels sẽ chứa MA_CB
                            // onChange={handleChangeLevel}
                            onChange={(e) => {
                                handleChangeLevel(e);
                                setErrors({ ...errors, MA_CB: null });
                            }}
                            label="Cấp bậc"
                            renderValue={(selected) => (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {selected.map((ma_cb) => {
                                        const level = levels.find((level) => level.MA_CB === ma_cb);
                                        return <Chip key={ma_cb} label={level ? level.TEN_CB : ma_cb} />;
                                    })}
                                </div>
                            )}
                            inputRef={maCBRef}
                            error={!!errors.MA_CB}
                        >
                            {levels.map((option) => (
                                <MenuItem
                                    style={{
                                        backgroundColor: selectedLevels.includes(option.MA_CB)
                                            ? 'rgb(129 196 212)'
                                            : 'transparent',
                                    }}
                                    key={option.MA_CB}
                                    value={option.MA_CB} // Lưu MA_CB thay vì TEN_CB
                                >
                                    {option.TEN_CB}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Loại hinh */}
                    <TextField
                        fullWidth
                        select
                        label="Loại hình"
                        name="MA_LOAI_HINH"
                        value={selectedType?.MA_LOAI_HINH || ''}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            const selectedObj = types.find((item) => item.MA_LOAI_HINH === selectedValue);
                            setSelectedType(selectedObj);
                            setEditingJob({ ...editingJob, MA_LOAI_HINH: selectedValue });
                            setErrors({ ...errors, MA_LOAI_HINH: '' });
                        }}
                        margin="normal"
                        inputRef={loaiHinhRef}
                        error={!!errors.MA_LOAI_HINH}
                    >
                        {types?.map((item) => (
                            <MenuItem key={item.MA_LOAI_HINH} value={item.MA_LOAI_HINH}>
                                {item.TEN_LOAI_HINH}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* Loại hợp đồng */}
                    <TextField
                        fullWidth
                        select
                        label="Loại hợp đồng"
                        name="MA_LOAI_HD"
                        value={selectedContract?.MA_LOAI_HD || ''}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            const selectedObj = contracts.find((item) => item.MA_LOAI_HD === selectedValue);
                            setSelectedContract(selectedObj);
                            setEditingJob({ ...editingJob, MA_LOAI_HD: selectedValue });
                            setErrors({ ...errors, MA_LOAI_HD: '' });
                        }}
                        margin="normal"
                        inputRef={loaiHDRef}
                        error={!!errors.MA_LOAI_HD}
                    >
                        {contracts?.map((item) => (
                            <MenuItem key={item.MA_LOAI_HD} value={item.MA_LOAI_HD}>
                                {item.TEN_LOAI_HD}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSave} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyRecruiments;
