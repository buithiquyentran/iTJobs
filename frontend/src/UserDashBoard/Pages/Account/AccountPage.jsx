import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    Box,
    Chip,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
   
} from '@mui/material';
import capBacService from '~/UserDashBoard/services/capBac.service';
import kiNangService from '~/UserDashBoard/services/kiNang.service';
import AuthService from '~/UserDashBoard/services/auth.service';
import NguoiLaoDongService from '~/UserDashBoard/services/nguoiLaoDong.service';
const AccountPage = () => {
    const [profile, setProfile] = useState({
        MA_NLD: '',
        TEN_NLD: '',
        NAM_SINH: '',
        GIOI_TINH: '',
        QUE_QUAN: '',
        EMAIL: '',
        HOC_VAN: '',
        MA_KN: '',
        MA_CB: '',
    });
    const [jobLevels, setJobLevels] = useState([]);
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response1 = await capBacService.getAll();
                setJobLevels(response1);

                const response2 = await kiNangService.getAll();
                setSkills(response2);
                const user = await AuthService.getUserInfo();

                const response = await NguoiLaoDongService.get(user.MA_NLD);
                setProfile({
                    MA_NLD: response.MA_NLD,
                    TEN_NLD: response.TEN_NLD,
                    NAM_SINH: response.NAM_SINH,
                    GIOI_TINH: response.GIOI_TINH,
                    QUE_QUAN: response.QUE_QUAN,
                    EMAIL: response.EMAIL,
                    HOC_VAN: response.HOC_VAN,
                    MA_KN: response.KiNangs?.map((item) => item.MA_KN) || [],
                    MA_CB: response.CapBacs?.map((item) => item.MA_CB) || [],
                });
                setSelectedSkills(response.KiNangs?.map((item) => item.MA_KN) || []);
                setSelectedLevels(response.CapBacs?.map((item) => item.MA_CB) || []);
            };
            fetchData();
        } catch (error) {
            console.error('Error fetching data, ', error);
        }
    }, []);
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(profile);
        try {
            const response = await NguoiLaoDongService.update(profile.MA_NLD, profile);
            if (response) {
                alert('Cập nhật thành công');
            }
        } catch (error) {
            alert('Cập nhật không thành công');
        }
    };
    const handleChangeSkill = (event) => {
        setSelectedSkills(event.target.value);
        setProfile({ ...profile, MA_KN: event.target.value });
    };
    const handleChangeLevel = (event) => {
        setSelectedLevels(event.target.value);
        setProfile({ ...profile, MA_CB: event.target.value });
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
                            value={profile.TEN_NLD || ''}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Năm sinh"
                            name="NAM_SINH"
                            type="date"
                            value={profile.NAM_SINH ? profile.NAM_SINH.split('T')[0] : ''}
                            onChange={handleChange}
                            margin="normal"
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
                            value={profile.QUE_QUAN || ''}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="EMAIL"
                            type="email"
                            value={profile.EMAIL || ''}
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
                                onChange={handleChangeSkill}
                                label="Kỹ năng chuyên môn"
                                renderValue={() => (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                        {selectedSkills.map((ma_kn) => {
                                            const skill = skills.find((skill) => skill.MA_KN === ma_kn);
                                            return <Chip key={ma_kn} label={skill ? skill.TEN_KN : ma_kn} />;
                                        })}
                                    </div>
                                )}
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
                                onChange={handleChangeLevel}
                                label="Cấp bậc"
                                renderValue={(selected) => (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                        {selected.map((ma_cb) => {
                                            const level = jobLevels.find((level) => level.MA_CB === ma_cb);
                                            return <Chip key={ma_cb} label={level ? level.TEN_CB : ma_cb} />;
                                        })}
                                    </div>
                                )}
                            >
                                {jobLevels.map((option) => (
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
