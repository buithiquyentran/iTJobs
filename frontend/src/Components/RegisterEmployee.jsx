import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';

import { Box, Typography, TextField, Button, Paper, Link, Tabs, Tab } from '@mui/material';
import { use } from 'react';
const RegisterEmployee = ({ switchToLogin }) => {
    const [formData, setFormData] = useState({
        SDT: '',
        MK: '',
        MK_CF: '',
        TEN_NLD: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async () => {
        if (!formData.SDT || !formData.MK || !formData.TEN_NLD || !formData.MK_CF) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (formData.MK !== formData.MK_CF) {
            alert('Vui lòng xác nhận lại mật khẩu');
        }
        try {
            const { SDT, MK, TEN_NLD } = formData;
            const response = await axios.post('http://localhost:5000/auth-page/register-employee', {
                SDT,  
                MK,
                TEN_NLD,
            });
            alert(response.data.message);
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
