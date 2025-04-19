import { useState, useEffect } from 'react';
import {
    Box,
    List,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    ListItem,
    ListItemText,
    IconButton,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Chip,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import authService from '~/EmployerDashBoard/services/auth.service';
import nhaTuyenDungService from '~/EmployerDashBoard/services/nhaTuyenDung.service';
import uploadService from '~/EmployerDashBoard/services/upload.service';
import kiNangService from '~/EmployerDashBoard/services/kiNang.service';
import linhVucService from '~/EmployerDashBoard/services/linhVuc.service';
const MyCompany = () => {
    const [companyInfo, setCompanyInfo] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [skills, setSkills] = useState([]);
    const [fields, setFields] = useState([]);

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await authService.getUserInfo();
                const response = await nhaTuyenDungService.get(user.MA_NTD);
                setCompanyInfo(response);

                // if (response.DIA_CHI_CU_THE?.length > 0)
                setCompanyInfo((prev) => ({ ...prev, DIA_CHI_CU_THE: response.DIA_CHI_CU_THE.join('\n') || '' }));
                // if (response.ABOUT?.length > 0)
                setCompanyInfo((prev) => ({ ...prev, ABOUT: response.ABOUT.join('\n') || '' }));
                // if (response.DAI_NGO?.length > 0)
                setCompanyInfo((prev) => ({ ...prev, DAI_NGO: response.DAI_NGO.join('\n') || '' }));
                setCompanyInfo((prev) => ({ ...prev, MA_KN: response.KiNangs?.map((item) => item.MA_KN) || [] }));
                setCompanyInfo((prev) => ({ ...prev, MA_LV: response.LinhVucs?.map((item) => item.MA_LV) || [] }));

                setSelectedSkills(response.KiNangs?.map((item) => item.MA_KN) || []); // skills được chọn
                setSelectedFields(response.LinhVucs?.map((item) => item.MA_LV) || []);
                const response2 = await kiNangService.getAll();
                const response3 = await linhVucService.getAll();

                setSkills(response2);
                setFields(response3);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    // Xử lý thay đổi giá trị form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo((prev) => ({ ...prev, [name]: value }));
    };
    const handleChangeSkill = (event) => {
        setSelectedSkills(event.target.value);
        setCompanyInfo({ ...companyInfo, MA_KN: event.target.value });
    };
    const handleChangeField = (event) => {
        setSelectedFields(event.target.value);
        setCompanyInfo({ ...companyInfo, MA_LV: event.target.value });
    };
    const handleSave = async () => {
        try {
            const data = {
                ...companyInfo,
                DIA_CHI_CU_THE: companyInfo?.DIA_CHI_CU_THE?.split('\n') || [],
                ABOUT: companyInfo.ABOUT?.split('\n') || [],
                DAI_NGO: companyInfo.DAI_NGO?.split('\n') || [],
            };

            console.log(data);

            // Gửi yêu cầu cập nhật thông tin công ty
            const response = await nhaTuyenDungService.update(data.MA_NTD, data);

            // Kiểm tra phản hồi từ server
            if (response) {
                alert('Cập nhật thông tin thành công!');
                console.log('Thông tin cập nhật: ', response.data);
            } else {
                alert('Cập nhật thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error || error.message);
        }
    };

    const renderField = (label, value, key) => (
        <Grid item xs={12} md={6} key={key}>
            <TextField
                sx={{
                    width: '100%',
                    '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'black', // Màu chữ khi disabled
                        borderColor: 'unset',
                    },
                    '& .MuiOutlinedInput-root': {
                        height: 'auto', // Cho phép chiều cao tự động mở rộng
                    },
                }}
                multiline
                // maxRows={10}
                label={label}
                name={key}
                value={value}
                fullWidth
                disabled={!isEditing || label == 'Username'}
                onChange={handleChange}
            />
        </Grid>
    );

    const handleUpload = async (e, type) => {
        try {
            const file = e.target.files[0];
            if (!file) return alert('Vui lòng chọn một tệp!');

            const formData = new FormData();
            formData.append('image', file); // 'image' phải trùng với upload.single("image")
            formData.append('type', type); // 'type' đ xác định logo hoặc img
            formData.append('MA_NTD', companyInfo?.MA_NTD);

            const response = await uploadService.uploadImage(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Xác định kiểu gửi
                },
            });

            if (response) {
                alert('Upload thành công!');
            } else {
                alert('Upload thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi upload ảnh: ', error);
            alert('Có lỗi xảy ra khi upload ảnh!');
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: '0px', marginLeft: '260px', marginTop: '64px' }}>
            {/* Logo và Banner */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                {/* Banner */}
                <Box sx={{ position: 'relative' }}>
                    <img
                        src={
                            companyInfo?.IMG?.startsWith('/uploads/')
                                ? `http://localhost:5000${companyInfo.IMG}`
                                : companyInfo?.IMG
                        }
                        alt="Banner công ty"
                        style={{
                            minWidth: '100%',
                            height: '300px',
                            objectFit: 'cover',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        id="upload-banner"
                        name="image"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            setSelectedLogo(e.target.files[0]);
                            handleUpload(e, 'IMG');
                        }}
                        // onChange={(e) => handleUpload(e, 'IMG')}
                    />
                    {isEditing && (
                        <label htmlFor="upload-banner">
                            <IconButton
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    bgcolor: 'white',
                                    boxShadow: 1,
                                }}
                                component="span"
                            >
                                <EditIcon />
                            </IconButton>
                        </label>
                    )}
                </Box>
                {/* Logo */}
                <Box sx={{ position: 'relative' }}>
                    <img
                        src={
                            companyInfo?.LOGO?.startsWith('/uploads/')
                                ? `http://localhost:5000${companyInfo.LOGO}`
                                : companyInfo?.LOGO
                        }
                        alt="Logo công ty"
                        style={{
                            width: '372px',
                            height: '200px',
                            position: 'absolute',
                            backgroundColor: '#fff',
                            bottom: '-50px',
                            left: '12px',
                            padding: 24,
                            objectFit: 'cover',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        }}
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        id="upload-logo"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            setSelectedBanner(e.target.files[0]);
                            handleUpload(e, 'LOGO');
                        }}
                    />
                    {isEditing && (
                        <label htmlFor="upload-logo">
                            <IconButton
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    bottom: '123px',
                                    left: '320px',
                                    bgcolor: 'white',
                                    boxShadow: 1,
                                }}
                                component="span"
                            >
                                <EditIcon />
                            </IconButton>
                        </label>
                    )}
                </Box>
            </Box>

            {/* Thông tin chung */}
            <Box sx={{ padding: '12px', width: '100%', marginTop: '50px' }}>
                <Typography variant="h4" gutterBottom>
                    {companyInfo?.TEN_NTD}
                </Typography>
                <Grid item xs={12}>
                    {isEditing ? (
                        companyInfo ? (
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Lưu Thay Đổi
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                'Đang tải...
                            </Button>
                        )
                    ) : (
                        <Button variant="outlined" onClick={() => setIsEditing(true)}>
                            Chỉnh Sửa
                        </Button>
                    )}
                </Grid>
                <TextField
                    sx={{
                        width: '100%',
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: 'black', // Màu chữ khi disabled
                            borderColor: 'unset',
                        },
                        marginBottom: 2,
                        marginTop: 2,
                    }}
                    fullWidth
                    label="Logan"
                    name="LOGAN"
                    value={companyInfo?.LOGAN ? companyInfo?.LOGAN : ''}
                    disabled={!isEditing}
                    onChange={handleChange}
                />
                <Grid container spacing={2}>
                    {renderField('Quy Mô', companyInfo?.QUY_MO ? companyInfo?.QUY_MO : '', 'QUY_MO')}
                    {renderField('Mã Số Thuế (MST)', companyInfo?.MST ? companyInfo.MST : '', 'MST')}
                    {renderField('Email', companyInfo?.EMAIL ? companyInfo?.EMAIL : '', 'EMAIL')}
                    {renderField('Username', companyInfo?.SDT ? companyInfo?.SDT : '', 'SDT')}
                    {renderField('Địa Chỉ', companyInfo?.DIA_CHI ? companyInfo?.DIA_CHI : '', 'DIA_CHI')}
                    {renderField('Quốc Tịch', companyInfo?.QUOC_TICH ? companyInfo?.QUOC_TICH : '', 'QUOC_TICH')}
                </Grid>
                {/* Kĩ năng */}
                <FormControl
                    disabled={!isEditing}
                    variant="outlined"
                    style={{
                        minWidth: '100%',
                        marginTop: '16px',
                        marginBottom: '8px',
                        // height: '50px',
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
                {/* Lĩnh vực */}
                <FormControl
                    disabled={!isEditing}
                    variant="outlined"
                    style={{
                        minWidth: '100%',
                        marginTop: '16px',
                        marginBottom: '8px',
                        height: '50px',
                    }}
                >
                    <InputLabel>Lĩnh vực chuyên môn</InputLabel>
                    <Select
                        multiple
                        value={selectedFields}
                        onChange={handleChangeField}
                        label="Kỹ năng chuyên môn"
                        renderValue={() => (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {selectedFields.map((id) => {
                                    const field = fields.find((field) => field.MA_LV === id);
                                    return <Chip key={id} label={field ? field.TEN_LV : id} />;
                                })}
                            </div>
                        )}
                    >
                        {fields.map((option, index) => (
                            <MenuItem
                                style={{
                                    backgroundColor: selectedFields.includes(option.MA_LV)
                                        ? 'rgb(129 196 212)'
                                        : 'transparent',
                                }}
                                key={option.MA_LV}
                                value={option.MA_LV}
                            >
                                {option.TEN_LV}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Giới thiệu công ty */}
                <Typography variant="h5" mt={4} gutterBottom>
                    Về Chúng Tôi
                </Typography>
                <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    label="Về Chúng Tôi"
                    name="ABOUT"
                    value={companyInfo?.ABOUT ? companyInfo.ABOUT : ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    sx={{
                        width: '100%',
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: 'black', // Màu chữ khi disabled
                            borderColor: 'unset',
                        },
                        marginBottom: 2,
                        marginTop: 2,
                    }}
                />
                {/* Địa chỉ làm việc */}
                <Typography variant="h5" mt={4} gutterBottom>
                    Địa Chỉ Làm Việc
                </Typography>
                <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    label="Địa Chỉ Làm Việc"
                    name="DIA_CHI_CU_THE"
                    value={companyInfo?.DIA_CHI_CU_THE ? companyInfo.DIA_CHI_CU_THE : ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    sx={{
                        width: '100%',
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: 'black', // Màu chữ khi disabled
                            borderColor: 'unset',
                        },
                        marginBottom: 2,
                        marginTop: 2,
                    }}
                />
                {/* Chế độ đãi ngộ */}
                <Typography variant="h5" mt={4} gutterBottom>
                    Phúc Lợi & Đãi Ngộ
                </Typography>
                <TextField
                    margin="dense"
                    fullWidth
                    multiline
                    label="Địa Chỉ Làm Việc"
                    name="DAI_NGO"
                    value={companyInfo?.DAI_NGO ? companyInfo.DAI_NGO : ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    sx={{
                        width: '100%',
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: 'black', // Màu chữ khi disabled
                            borderColor: 'unset',
                        },
                        marginBottom: 2,
                        marginTop: 2,
                    }}
                />
                <Typography variant="h5" mt={4} gutterBottom>
                    Website
                </Typography>
                <TextField
                    sx={{
                        width: '100%',
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: 'black', // Màu chữ khi disabled
                            borderColor: 'unset',
                        },
                        marginTop: 2,
                    }}
                    fullWidth
                    label="Website"
                    name="WEBSITE"
                    value={companyInfo?.WEBSITE ? companyInfo?.WEBSITE : ''}
                    disabled={!isEditing}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
};

export default MyCompany;
