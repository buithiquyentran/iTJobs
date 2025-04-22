// ApplyForm.js
import moment from 'moment';

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
    Divider,
    TextareaAutosize,
    IconButton,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icon con mắt

import cvService from '../services/cv.service';
import AuthService from '~/UserDashBoard/services/auth.service';
import nguoiLaoDongService from '../services/nguoiLaoDong.service';
import ungTuyenService from '../services/ungTuyen.service';
import uploadService from '../services/upload.service';
import thongBaoService from '../services/thongBao.service';
import { AltRoute } from '@mui/icons-material';
export default function ApplyForm({ infoToApply, onCancle }) {
    const [formData, setFormData] = useState({ infoToApply, LOI_NHAN: '' });
    const [cvs, setCvs] = useState([]);
    const [cvList, setCvList] = useState([]); // CV just uploaded
    const [nld, setNLd] = useState(null);
    const [selectedCV, setSelectedCV] = useState('');
    const hoTenRef = useRef(null);
    const emailRef = useRef(null);
    const sdtRef = useRef(null);
    const loiNhanRef = useRef(null);

    const [errors, setErrors] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            setFormData(infoToApply);
            try {
                const userInfo = await AuthService.getUserInfo();
                const response = await nguoiLaoDongService.get(userInfo.MA_NLD);
                // console.log(response);
                setNLd(response);

                const response2 = await cvService.findByMA_NLD(userInfo.MA_NLD);
                setCvs(response2 || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [infoToApply]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCVUpload = async (e) => {
        const file = e.target.files[0];
        // console.log(file);
        if (file) {
            try {
                const form = new FormData();
                form.append('cv', file);

                const response = await uploadService.uploadCV(nld.MA_NLD, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Xác định kiểu gửi
                    },
                });
                // console.log(response);
                if (response) {
                    // console.log(response?.newCV);
                    const newCV = { CV_LINK: response?.CV_LINK, TEN_CV: response?.TEN_CV };
                    console.log([...cvList, newCV]);
                    setCvList([...cvList, newCV]);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    const isValidID = (val) => {
        return /^\d+$/.test(val);
    };
    const handleSubmit = async () => {
        const { SDT, MA_TTD, HO_TEN, EMAIL, SDT_UNG_VIEN, LOI_NHAN, TEN_TTD, NTD_USERNAME } = formData;
        let data = { SDT, MA_TTD, HO_TEN, EMAIL, SDT_UNG_VIEN, LOI_NHAN };

        if (!HO_TEN) {
            hoTenRef.current?.focus();
            setErrors({ ...errors, HO_TEN: 'Trường này không được để trống' });
            return;
        } else {
            if (HO_TEN.trim().length > 255) {
                setErrors({ ...errors, HO_TEN: 'Họ tên không được vượt quá 255 ký tự' });
                return;
            }
            // Regex cho họ tên: chỉ chấp nhận chữ cái (bao gồm dấu tiếng Việt) và khoảng trắng
            const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u;

            if (!nameRegex.test(HO_TEN.trim())) {
                setErrors({ ...errors, HO_TEN: 'Họ tên không được chứa ký tự đặc biệt hoặc số' });
                return;
            }
        }
        // Kiểm tra format Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (EMAIL && !emailRegex.test(EMAIL)) {
            emailRef.current?.focus();
            setErrors({ ...errors, EMAIL: 'Email không hợp lệ' });

            return;
        }

        // Kiểm tra format Số điện thoại (10 chữ số, bắt đầu bằng 0)
        const phoneRegex = /^0\d{9}$/;
        if (SDT_UNG_VIEN && !phoneRegex.test(SDT_UNG_VIEN)) {
            sdtRef.current?.focus();

            setErrors({ ...errors, SDT_UNG_VIEN: 'Số điện thoại không hợp lệ' });
            return;
        }
        if (LOI_NHAN?.trim().length > 255) {
            loiNhanRef.current?.focus();
            setErrors({ ...errors, LOI_NHAN: 'Lời nhắn không được quá 255 ký tự' });
            console.log('Lời nhắn không được quá 255 ký tự');
            return;
        }
        // Xóa lỗi nếu tất cả hợp lệ
        setErrors({});
        // Chọn CV chưa
        if (!selectedCV) {
            alert('Vui lòng chọn CV');
            return;
        }
        setFormData({ ...formData, CV: selectedCV });
        // console.log({ ...formData, CV: selectedCV });
        if (isValidID(selectedCV)) {
            data = { ...data, MA_CV: selectedCV };
        } else {
            data = { ...data, CV_LINK: selectedCV };
        } 

        // Thong bao
        let noidung = `${HO_TEN} đã ứng tuyển vào TTD "${TEN_TTD}" vào lúc ${moment().format('DD/MM/YYYY HH:mm:ss')} !`;
        const thongBaoInfo = { SDT: NTD_USERNAME, NOI_DUNG: noidung };
        console.log(thongBaoInfo);

        try {
            const response = await ungTuyenService.create(data);
            const response2 = await thongBaoService.create(thongBaoInfo);

            if (response && response2) {
                alert('Ứng tuyển thành công');
            }
        } catch (error) {
            console.log(error);
            alert('Lỗi khi ứng tuyển', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: '1200px', margin: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                BẠN ĐANG ỨNG TUYỂN CHO VỊ TRÍ <br />
                <span style={{ color: 'red' }}>{formData?.TEN_TTD || ''}</span> - <strong>{formData?.TEN_NTD}</strong>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Full Name"
                    name="HO_TEN"
                    inputRef={hoTenRef}
                    required
                    value={formData?.HO_TEN || ''}
                    onChange={(e) => {
                        handleChange(e);
                        setErrors({ ...errors, HO_TEN: '' });
                    }}
                    error={!!errors.HO_TEN}
                    helperText={errors.HO_TEN}
                />

                <TextField
                    label="Phone Number"
                    name="SDT_UNG_VIEN"
                    value={formData?.SDT_UNG_VIEN || ''}
                    // onChange={handleChange}
                    onChange={(e) => {
                        handleChange(e);
                        setErrors({ ...errors, SDT_UNG_VIEN: '' });
                    }}
                    error={!!errors.SDT_UNG_VIEN}
                    helperText={errors.SDT_UNG_VIEN}
                />
                <TextField
                    label="Email"
                    name="EMAIL"
                    type="EMAIL"
                    required
                    value={formData?.EMAIL || ''}
                    // onChange={handleChange}
                    onChange={(e) => {
                        handleChange(e);
                        setErrors({ ...errors, EMAIL: '' });
                    }}
                    error={!!errors.EMAIL}
                    helperText={errors.EMAIL}
                />

                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        CV CỦA BẠN
                    </Typography>

                    <RadioGroup value={selectedCV} onChange={(e) => setSelectedCV(e.target.value)}>
                        {/* From CV tool */}
                        {cvs?.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'error.main', // màu đỏ
                                    borderRadius: 2,
                                    backgroundColor: '#fff5f5', // nền hồng nhạt
                                    padding: 1.5,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1, // margin bottom giữa các dòng
                                }}
                            >
                                <FormControlLabel
                                    borderColor="error.main"
                                    borderRadius={2}
                                    bgcolor="#fff5f5"
                                    value={item.MA_CV}
                                    control={<Radio />}
                                    label={item.TEN_CV}
                                />
                                <Box sx={{ fontSize: '14px' }}>From Create CV tool</Box>
                                <IconButton
                                    color="primary"
                                    component={Link}
                                    to={`/user/view-cv/${item.MA_CV}?isEditting=false`}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </Box>
                        ))}
                        {/* CV from your computer */}
                        {nld?.CV_LINK?.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'error.main', // màu đỏ
                                    borderRadius: 2,
                                    backgroundColor: '#fff5f5', // nền hồng nhạt
                                    padding: 1.5,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1, // margin bottom giữa các dòng
                                }}
                            >
                                <FormControlLabel
                                    borderColor="error.main"
                                    borderRadius={2}
                                    bgcolor="#fff5f5"
                                    value={item.CV_LINK}
                                    control={<Radio />}
                                    label={item.TEN_CV}
                                />
                                <Box sx={{ fontSize: '14px' }}>Upload from computer</Box>
                                <IconButton color="primary" component={Link} to={item.CV_LINK}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Box>
                        ))}
                        {/* CV just upload */}
                        {cvList.length > 0 &&
                            cvList?.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'error.main', // màu đỏ
                                        borderRadius: 2,
                                        backgroundColor: '#fff5f5', // nền hồng nhạt
                                        padding: 1.5,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 1, // margin bottom giữa các dòng
                                    }}
                                >
                                    <FormControlLabel
                                        borderColor="error.main"
                                        borderRadius={2}
                                        bgcolor="#fff5f5"
                                        value={item.CV_LINK}
                                        control={<Radio />}
                                        label={item.TEN_CV}
                                    />
                                    <Box sx={{ fontSize: '14px' }}>CV just uploaded</Box>
                                    <IconButton color="primary" component={Link} to={item.CV_LINK}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </Box>
                            ))}
                    </RadioGroup>

                    <Button variant="contained" component="label" sx={{ mt: 1 }}>
                        Upload new CV
                        <input type="file" hidden onChange={handleCVUpload} />
                    </Button>
                    {formData.CV && (
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Selected: {formData.CV}
                        </Typography>
                    )}
                </Box>

                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        THƯ GIỚI THIỆU
                    </Typography>
                    <TextField
                        name="LOI_NHAN"
                        multiline
                        placeholder="Enter your self-introduction or portfolio link"
                        style={{ width: '100%', padding: '10px' }}
                        value={formData.LOI_NHAN || ''}
                        inputRef={loiNhanRef}
                        onChange={(e) => {
                            handleChange(e);
                            setErrors({ ...errors, LOI_NHAN: '' });
                        }}
                        error={!!errors.LOI_NHAN}
                        helperText={errors.LOI_NHAN}
                    />
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={onCancle}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={handleSubmit}>
                        Send CV
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
