import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Grid2';

import { Box, Typography, TextField, Button, Paper, Link, Tabs, Tab, Chip } from '@mui/material';
import linhVucService from '~/UserDashBoard/services/linhVuc.service';

const RegisterEmployer = ({ switchToLogin }) => {
    const [error, setError] = useState({});
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
            const ops = await linhVucService.getAll();
            setOptions(ops);
        };
        fetchData();
    }, []);
    const handleChangeMenu = (e) => {
        const { name, value } = e.target;
        setSelected(value); // value là array các MA_LV

        if (value.length > 0) {
            setError((prev) => ({ ...prev, Linh_Vuc: '' }));
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value.join(','), // hoặc giữ dạng array tuỳ backend
        }));
    };
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
        }
        if (name === 'MK_CF') {
            if (formData.MK === value) {
                setError((prev) => ({ ...prev, MK_CF: '' }));
            } else {
                setError((prev) => ({ ...prev, MK_CF: 'Vui lòng xác nhận lại mật khẩu' }));
            }
        }
        if (name === 'TEN_NTD') {
            if (value.trim() !== '') {
                setError((prev) => ({ ...prev, TEN_NTD: '' }));
            }
        }

        if (name === 'MST') {
            if (value.trim() !== '') {
                setError((prev) => ({ ...prev, MST: '' }));
            }
        }

        if (name === 'DIA_CHI') {
            if (value.trim() !== '') {
                setError((prev) => ({ ...prev, DIA_CHI: '' }));
            }
        }
        if (name === 'EMAIL') {
            if (value.trim() !== '') {
                setError((prev) => ({ ...prev, EMAIL: '' }));
            }
        }
    };
    const handleSubmit = async () => {
        if (!formData.SDT) {
            setError((prev) => ({ ...prev, SDT: 'Vui lòng nhập số điện thoại' }));
            return;
        }
        if (!formData.MK) {
            setError((prev) => ({ ...prev, MK: 'Vui lòng nhập mật khẩu' }));
            return;
        }
        if (!formData.MK_CF) {
            setError((prev) => ({ ...prev, MK_CF: 'Vui lòng xác nhận mật khẩu' }));
            return;
        }
        if (formData.MK !== formData.MK_CF) {
            setError((prev) => ({ ...prev, MK_CF: 'Vui lòng xác nhận lại mật khẩu' }));
            return;
        }
        if (!formData.TEN_NTD) {
            setError((prev) => ({ ...prev, TEN_NTD: 'Vui lòng nhập tên công ty' }));
            return;
        }

        if (!formData.MST) {
            setError((prev) => ({ ...prev, MST: 'Vui lòng nhập mã số thuế' }));
            return;
        }
        if (selected.length < 1) {
            setError((prev) => ({ ...prev, Linh_Vuc: 'Vui lòng chọn lĩnh vực của công ty bạn' }));
            return;
        }
        if (!formData.DIA_CHI) {
            setError((prev) => ({ ...prev, DIA_CHI: 'Vui lòng nhập trụ sở công ty' }));
            return;
        }

        if (!formData.EMAIL) {
            setError((prev) => ({ ...prev, EMAIL: 'Vui lòng nhập email' }));
            return;
        }
        try {
            const { SDT, MK, TEN_NTD, EMAIL, MST, DIA_CHI, Linh_Vuc } = formData;
            const response = await axios.post(
                'http://localhost:5000/api/auth-page/register-employer',
                {
                    SDT,
                    MK,
                    TEN_NTD,
                    EMAIL,
                    MST,
                    DIA_CHI,
                    Linh_Vuc,
                },
                { withCredentials: true },
            );
            if (response.data.user.SDT) {
                alert('Đăng ký thành công!');
            } else {
                alert(response.data.user);
            }
            // if (response.data.user) {
            //     localStorage.setItem('role', response.data.user.MA_ROLE);
            //     alert('Đăng ký thành công!');
            //     navigate('/', { replace: true });
            //     window.location.reload();
            // } else {
            //     setError(response.data.error);
            //     console.log(response.data.error);
            // }
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
                name="SDT"
                label="Số điện thoại"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.SDT} // Hiển thị outline màu đỏ nếu có lỗi
                helperText={error.SDT} // Hiển thị thông báo lỗi bên dưới
            />
            <TextField
                onChange={handleChange}
                name="MK"
                label="Mật khẩu"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.MK} // Hiển thị outline màu đỏ nếu có lỗi
                helperText={error.MK} // Hiển thị thông báo lỗi bên dưới
            />
            <TextField
                onChange={handleChange}
                name="MK_CF"
                label="Xác nhận mật khẩu"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.MK_CF} // Hiển thị outline màu đỏ nếu có lỗi
                helperText={error.MK_CF} // Hiển thị thông báo lỗi bên dưới
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
                error={!!error.TEN_NTD} // Hiển thị outline màu đỏ nếu có lỗi
                helperText={error.TEN_NTD} // Hiển thị thông báo lỗi bên dưới
            />
            <TextField
                onChange={handleChange}
                name="MST"
                label="Mã số thuế"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error.MST} // Hiển thị outline màu đỏ nếu có lỗi
                helperText={error.MST} // Hiển thị thông báo lỗi bên dưới
            />

            <FormControl
                error={!!error.Linh_Vuc}
                variant="outlined"
                style={{
                    minWidth: '100%',
                    marginTop: '16px',
                    marginBottom: '8px',
                }}
            >
                <InputLabel>Lĩnh vực</InputLabel>
                <Select
                    multiple
                    value={selected}
                    onChange={handleChangeMenu}
                    label="Lĩnh vực"
                    name="Linh_Vuc"
                    renderValue={(selected) => (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {selected.map((ma_lv) => {
                                const found = options.find((opt) => opt.MA_LV === ma_lv);
                                return <Chip key={ma_lv} label={found?.TEN_LV || ma_lv} />;
                            })}
                        </div>
                    )}
                >
                    {options?.map((option) => (
                        <MenuItem
                            key={option.MA_LV}
                            value={option.MA_LV}
                            style={{
                                backgroundColor: selected.includes(option.MA_LV) ? 'rgb(129 196 212)' : 'transparent',
                            }}
                        >
                            {option.TEN_LV}
                        </MenuItem>
                    ))}
                </Select>

                {error.Linh_Vuc && <FormHelperText>{error.Linh_Vuc}</FormHelperText>}
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
