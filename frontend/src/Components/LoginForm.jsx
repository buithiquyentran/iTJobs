import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import axios from 'axios';

const LoginForm = ({ switchToRegister }) => {
    const [formData, setFormData] = useState({
        SDT: '',
        MK: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        if (!formData.SDT || !formData.MK) {
            alert('Vui lòng nhập đầy đủ số điện thoại và mật khẩu');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth-page/login', formData);
            alert(response.data.message);

            // Xử lý chuyển hướng sau khi đăng nhập thành công (nếu cần)
            
        } catch (error) {
            console.error('Error handle submit: ', error);
            alert('Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại');
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
