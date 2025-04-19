import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import axios from 'axios';
import AuthService from '~/UserDashBoard/services/auth.service';
const LoginForm = ({ switchToRegister }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        SDT: '',
        MK: '',
    });
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        if (!formData.SDT) {
            setError((prev) => ({ ...prev, SDT: 'Vui lòng nhập số điện thoại' }));
            return;
        }
        if (!formData.MK) {
            setError((prev) => ({ ...prev, MK: 'Vui lòng nhập mật khẩu' }));
            return;
        }
        try {
            const response = await AuthService.Login(formData);
            localStorage.setItem('role', response.user.MA_ROLE);
            // chuyển sang trang admin
            if (response.user.MA_ROLE == 1) {
                window.location.href = 'http://localhost:5174/';
            } else {
                // alert('Đăng nhập thành công!');
                // navigate('/', { replace: true });
                // window.location.reload();
            }
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Error handle submit: ', error);
            setError({
                SDT: 'Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại',
                MK: 'Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại',
            });
            S;
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Số điện thoại"
                name="SDT"
                value={formData.SDT}
                onChange={handleChange}
                type="text"
                fullWidth
                margin="normal"
                InputProps={{ sx: { height: 60 } }}
                variant="outlined"
                error={!!error.SDT}
                helperText={error.SDT}
            />
            <TextField
                label="Mật khẩu"
                name="MK"
                value={formData.MK}
                onChange={handleChange}
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.MK}
                helperText={error.MK}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Đăng nhập
            </Button>
            <Box textAlign="center" mt={2}>
                <Link href="#" underline="none">
                    Quên mật khẩu?
                </Link>
                <Typography>
                    Bạn chưa có tài khoản?&nbsp;
                    <Link underline="none" onClick={switchToRegister} style={{ cursor: 'pointer' }}>
                        Đăng ký ngay
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;
