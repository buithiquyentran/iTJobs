import React, { useState } from 'react';
import {
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Container,
    Typography,
    Card,
    CardContent,
    MenuItem,
    Box,
} from '@mui/material';

const AccountPage = () => {
    const [profile, setProfile] = useState({
        TEN_NLD: '',
        NAM_SINH: '',
        GIOI_TINH: 'Nam',
        QUE_QUAN: '',
        EMAIL: '',
        HOC_VAN: '',
        TEN_KN: '',
        TEN_CB: '',
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Thông tin cập nhật:', profile);
        alert('Cập nhật thành công!');
    };

    return (
        <Box sx={{ maxWidth: '1000px', padding: 0 }} className="setting-page" maxWidth="sm">
            <Card>
                <CardContent sx={{ padding: 3 }}>
                    <h2>Chỉnh sửa thông tin cá nhân</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Họ và Tên"
                            name="TEN_NLD"
                            value={profile.TEN_NLD}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Năm sinh"
                            name="NAM_SINH"
                            type="date"
                            value={profile.NAM_SINH}
                            onChange={handleChange}
                            margin="normal"
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                            Giới tính:
                        </Typography>
                        <RadioGroup row name="GIOI_TINH" value={profile.GIOI_TINH} onChange={handleChange}>
                            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                            <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
                        </RadioGroup>
                        <TextField
                            fullWidth
                            label="Quê quán"
                            name="QUE_QUAN"
                            value={profile.QUE_QUAN}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="EMAIL"
                            type="email"
                            value={profile.EMAIL}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            select
                            label="Học vấn"
                            name="HOC_VAN"
                            value={profile.HOC_VAN}
                            onChange={handleChange}
                            margin="normal"
                        >
                            <MenuItem value="Cử nhân">Cử nhân</MenuItem>
                            <MenuItem value="Thạc sĩ">Thạc sĩ</MenuItem>
                            <MenuItem value="Tiến sĩ">Tiến sĩ</MenuItem>
                            <MenuItem value="Khác">Khác</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            label="Kỹ năng chuyên môn"
                            name="TEN_KN"
                            value={profile.TEN_KN}
                            onChange={handleChange}
                            margin="normal"
                        />

                        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                            Lưu thay đổi
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AccountPage;
