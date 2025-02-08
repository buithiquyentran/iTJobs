import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Grid2';

import { Box, Typography, TextField, Button, Paper, Link, Tabs, Tab, Chip } from '@mui/material';
const RegisterEmployer = ({ switchToLogin }) => {
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);
    const [formData, setFormData] = useState({
        SDT: '',
        MK: '',
        MK_CF: '',
        TEN_NTD: '',
        EMAIL: '',
        MST: '',
        DIA_CHI: '',
        Linh_Vuc: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            const ops = await axios.get('http://localhost:5000/fields/');
            setOptions(ops.data);
            // console.log(ops.data);
        };
        fetchData();
    }, []);
    const handleChangeMenu = (event) => {
        setSelected(event.target.value);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async () => {
        if (
            !formData.SDT ||
            !formData.MK ||
            !formData.TEN_NTD ||
            !formData.MK_CF ||
            !formData.EMAIL ||
            !formData.MST ||
            !formData.DIA_CHI
        ) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (selected.length > 0) {
            setFormData({ ...formData, ['Linh_Vuc']: selected.join(', ') });
        } else {
            alert('Vui lòng chọn lĩnh vực của công ty bạn');
            return;
        }
        if (formData.MK !== formData.MK_CF) {
            alert('Vui lòng xác nhận lại mật khẩu');
        }
        try {
            const { SDT, MK, TEN_NTD, EMAIL, MST, DIA_CHI, Linh_Vuc } = formData;
            // console.log(SDT, MK, TEN_NTD, EMAIL, MST, DIA_CHI, Linh_Vuc);

            const response = await axios.post('http://localhost:5000/auth-page/register-employer', {
                SDT,
                MK,
                TEN_NTD,
                EMAIL,
                MST,
                DIA_CHI,
                Linh_Vuc,
            });
            // console.log(response)
            alert(response.data.message);
        } catch (error) {
            console.error('Errror register ', error);
        }
    };
    return (
        <Box sx={{ marginTop: '60px' }}>
            <Typography color="var(--mui-palette-error-main)" fontWeight="bold">
                Thông tin đăng nhập
            </Typography>
            <TextField
                onChange={handleChange}
                name="TEN_NTD"
                label="Họ và tên"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                onChange={handleChange}
                name="SDT"
                label="Số điện thoại"
                type="text" 
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                onChange={handleChange}
                name="MK"
                label="Mật khẩu"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                onChange={handleChange}
                name="MK_CF"
                label="Xác nhận mật khẩu"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Typography color="var(--mui-palette-error-main)" fontWeight="bold">
                Thông tin công ty
            </Typography>

            <TextField
                onChange={handleChange}
                name="TEN_NTD"
                label="Tên công ty"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                onChange={handleChange}
                name="MST"
                label="Mã số thuế"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
            />

            <FormControl
                variant="outlined"
                style={{
                    minWidth: '100%',
                    marginTop: '16px',
                    marginBottom: '8px',
                    height: '50px',
                }}
            >
                <InputLabel>Lĩnh vực</InputLabel>
                <Select
                    multiple
                    value={selected}
                    onChange={handleChangeMenu}
                    label="Lĩnh vực"
                    renderValue={(selected) => (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </div>
                    )}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            style={{ backgroundColor: selected.includes(option) ? 'rgb(129 196 212)' : 'transparent' }}
                            key={index}
                            value={option}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                onChange={handleChange}
                name="DIA_CHI"
                label="Trụ sở"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                name="EMAIL"
                onChange={handleChange}
                label="Email"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
            />

            <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Đăng ký
            </Button>

            <Typography>
                Bạn đã có tài khoản nhà tuyển dụng?&nbsp;
                <Link underline="none" onClick={switchToLogin} style={{ cursor: 'pointer' }}>
                    Đăng nhập ngay
                </Link>
            </Typography>
        </Box>
    );
};
export default RegisterEmployer;
