import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, TextField, Button, Paper, Link, Tabs, Tab } from '@mui/material';
import { use } from 'react';
const RegisterEmployee = ({ switchToLogin }) => {
    const [formData, setFormData] = useState({
        SDT: '',
        MK: '',
        MK_CF: '',
        TEN_NLD: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'TEN_NLD') {
            if (value.trim() !== '') {
                setError((prev) => ({ ...prev, TEN_NLD: '' }));
            }
        }
        if (name === 'SDT') {
            if (value.trim() !== '') {
                setError((prev) => ({ ...prev, SDT: '' }));
            }
        }
        if (name === 'MK') {
            if (value.trim() !== '') {
                setError((prev) => ({ ...prev, MK: '' }));
            }
            if (formData.MK == formData.MK_CF) {
                setError((prev) => ({ ...prev, MK: '' }));
            }
        }
        if (name === 'MK_CF') {
            if (formData.MK === formData.MK_CF) {
                setError((prev) => ({ ...prev, MK_CF: '' }));
            }
        }
    };

    const handleSubmit = async () => {
        if (!formData.TEN_NLD) {
            setError((prev) => ({ ...prev, TEN_NLD: 'Vui lòng nhập họ và tên' }));
            return;
        }
        if (!formData.SDT) {
            setError((prev) => ({ ...prev, SDT: 'Vui lòng nhập số điện thoại' }));
            return;
        }
        if (!formData.MK) {
            setError((prev) => ({ ...prev, MK: 'Vui lòng nhập mật khẩu' }));
            return;
        }

        if (!formData.MK_CF) {
            setError((prev) => ({ ...prev, MK_CF: 'Vui lòng xác nhận lại mật khẩu' }));
            return;
        }
        if (formData.MK !== formData.MK_CF) {
            setError((prev) => ({ ...prev, MK_CF: 'Vui lòng xác nhận lại mật khẩu' }));
        }
        try {
            const { SDT, MK, TEN_NLD } = formData;
            const response = await axios.post(
                'http://localhost:5000/api/auth-page/register-employee',
                {
                    SDT,
                    MK,
                    TEN_NLD,
                },
                { withCredentials: true },
            );
            if (response.data.user) {
                navigate('/', { replace: true });
            } else {
                setError(response.data.error);
                console.log(response.data.error);
            }
        } catch (error) {
            console.error('Errror register ', error);
        }
    };
    return (
        <Box sx={{ marginTop: '60px' }}>
            <TextField
                onChange={handleChange}
                name="TEN_NLD"
                value={formData.TEN_NLD}
                label="Họ và tên"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.TEN_NLD} // Hiển thị outline màu đỏ nếu có lỗi
                helperText={error.TEN_NLD} // Hiển thị thông báo lỗi bên dưới
            />
            <TextField
                onChange={handleChange}
                name="SDT"
                value={formData.SDT}
                label="Số điện thoại"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.SDT}
                helperText={error.SDT}
            />
            <TextField
                onChange={handleChange}
                name="MK"
                value={formData.MK}
                label="Mật khẩu"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.MK}
                helperText={error.MK}
            />
            <TextField
                onChange={handleChange}
                name="MK_CF"
                value={formData.MK_CF}
                label="Xác nhận mật khẩu"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.MK_CF}
                helperText={error.MK_CF}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Đăng ký
            </Button>
            <Typography>
                Bạn đã có tài khoản người lao động?&nbsp;
                <Link underline="none" onClick={switchToLogin} style={{ cursor: 'pointer' }}>
                    Đăng nhập ngay
                </Link>
            </Typography>
        </Box>
    );
};
export default RegisterEmployee;
