import React, { useState, useEffect, useRef } from 'react';
import { TextField, Typography, Box, Grid, Paper, Button } from '@mui/material';
import ProjectCard from '../Components/ProjectCard';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AuthService from '~/UserDashBoard/services/auth.service';
import cvService from '~/UserDashBoard/services/cv.service';
import duAnService from '~/UserDashBoard/services/duAn.service';

const CVPreview = () => {
    const { id } = useParams();
    // console.log(id);
    const [cv, setCV] = useState({});
    const [projects, setProjects] = useState([]);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const isEditting = params.get('isEditting') === 'true';
    const tenCVRef = useRef(null);
    const hoTenRef = useRef(null);
    const emailRef = useRef(null);
    const sdtRef = useRef(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AuthService.getUserInfo();
                console.log(user);
                if (!id) {
                    setCV({
                        MA_NLD: user?.MA_NLD,
                        KiNangs: [''],
                        CHUNG_CHI: [''],
                        HOC_VAN: [''],
                        KINH_NGHIEM: [''],
                        GIOI_THIEU: [''],
                        MUC_TIEU_NGHE_NGHIEP: '',
                        TEN_CV: '',
                        HO_TEN: '',
                        NAM_SINH: null,
                        EMAIL: '',
                        SDT: '',
                        TP: '',
                        GITHUB: '',
                    });

                    // return;
                } else {
                    const response = await cvService.get(id);
                    console.log(response);
                    setCV(response);
                    setProjects(response.DuAns);
                    if (!response.KiNangs) {
                        setCV((prev) => ({ ...prev, KiNangs: [''] }));
                    }
                    if (!response.CHUNG_CHI) {
                        setCV((prev) => ({ ...prev, CHUNG_CHI: [''] }));
                    }
                    if (!response.HOC_VAN) {
                        setCV((prev) => ({ ...prev, HOC_VAN: [''] }));
                    }
                    if (!response.KINH_NGHIEM) {
                        setCV((prev) => ({ ...prev, KINH_NGHIEM: [''] }));
                    }
                    if (!response.GIOI_THIEU) {
                        setCV((prev) => ({ ...prev, GIOI_THIEU: [''] }));
                    }
                    if (!response.MUC_TIEU_NGHE_NGHIEP) {
                        setCV((prev) => ({ ...prev, MUC_TIEU_NGHE_NGHIEP: '' }));
                    }
                }
            } catch (error) {
                console.log(error);
                alert('Bạn không có quyền truy cập CV này');
                window.location.href = '/jobs';
            }
        };
        fetchData();
    }, []);

    const handleChange = (field, value) => {
        setCV((prev) => ({ ...prev, [field]: value || '' }));
    };
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u;
    const handleSubmit = async () => {
        if (!cv.TEN_CV) {
            tenCVRef.current?.focus();
            setErrors({ ...errors, TEN_CV: 'Trường này không được để trống' });
            return;
        } else {
            if (cv.TEN_CV.trim().length > 255) {
                setErrors({ ...errors, TEN_CV: 'Tên CV không được vượt quá 255 ký tự' });
                return;
            }
            //  Regex cho họ tên: chỉ chấp nhận chữ cái (bao gồm dấu tiếng Việt) và khoảng trắng

            if (!nameRegex.test(cv.TEN_CV.trim())) {
                setErrors({ ...errors, TEN_CV: 'Tên CV không được chứa ký tự đặc biệt hoặc số' });
                return;
            }
        }
        
        if (!cv.HO_TEN) {
            hoTenRef.current?.focus();
            setErrors({ ...errors, HO_TEN: 'Trường này không được để trống' });
            return;
        } else {
            if (cv.HO_TEN.trim().length > 255) {
                setErrors({ ...errors, HO_TEN: 'Họ tên không được vượt quá 255 ký tự' });
                return;
            }
            // Regex cho họ tên: chỉ chấp nhận chữ cái (bao gồm dấu tiếng Việt) và khoảng trắng

            if (!nameRegex.test(cv.HO_TEN.trim())) {
                setErrors({ ...errors, HO_TEN: 'Họ tên không được chứa ký tự đặc biệt hoặc số' });
                return;
            }
        }
        // Kiểm tra format Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (cv.EMAIL && !emailRegex.test(cv.EMAIL)) {
            emailRef.current?.focus();
            setErrors({ ...errors, EMAIL: 'Email không hợp lệ' });

            return;
        }

        // Kiểm tra format Số điện thoại (10 chữ số, bắt đầu bằng 0)
        const phoneRegex = /^0\d{9}$/;
        if (cv.SDT && !phoneRegex.test(cv.SDT)) {
            sdtRef.current?.focus();

            setErrors({ ...errors, SDT: 'Số điện thoại không hợp lệ' });
            return;
        }

        // Xóa lỗi nếu tất cả hợp lệ
        setErrors({});

        try {
            let response1 = undefined;
            if (cv?.MA_CV) {
                response1 = await cvService.update(cv.MA_CV, cv);
            } else {
                console.log(cv);
                response1 = await cvService.create(cv); // API tạo mới CV
                // setCV(response1); // Cập nhật lại ID mới
                // console.log(response1);
            }
            const response =
                projects.length < 1
                    ? true
                    : projects?.map(async (project) => {
                          if (project.MA_DU_AN) {
                              return await duAnService.update(project.MA_DU_AN, project);
                          } else {
                              // console.log({ ...project, MA_CV: id });
                              // delete project.MA_DU_AN;
                              if (id) return await duAnService.create({ ...project, MA_CV: id }); // Gán CV mới
                              else return await duAnService.create({ ...project, MA_CV: response1.MA_CV }); // Gán CV mới
                          }
                      });

            if (response && response1) {
                if (!id) alert('CV được thêm mới thành công');
                else alert('Cập nhật CV thành công');
            } else {
                alert('Vui lòng đăng nhập để tạo CV');
                window.location.href = '/auth-page';
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleProjectChange = (index, updatedProject) => {
        const newProjects = [...projects];
        newProjects[index] = updatedProject;
        setProjects(newProjects);
    };

    const handleDeleteProject = async (index, projectId) => {
        try {
            if (window.confirm('Bạn có chắc muốn xóa dự án này không?')) {
                await duAnService.delete(projectId); // Gọi API xóa
                const newProjects = projects.filter((_, i) => i !== index);
                setProjects(newProjects);
                alert('Xóa dự án thành công!');
            }
        } catch (error) {
            console.error('Lỗi khi xóa dự án: ', error);
        }
    };

    return (
        <Box elevation={3} sx={{ padding: 3, maxWidth: '800px', margin: 'auto' }}>
            <Paper elevation={3} sx={{ padding: 3, display: 'flex' }}>
                <Box width={300} sx={{ marginRight: 2.5 }}>
                    <Box>
                        <img
                            style={{ marginBottom: '12px' }}
                            width={250}
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="Ảnh CV"
                        />
                    </Box>
                    <Typography variant="h8" fontWeight="bold">
                        Giới Thiệu
                    </Typography>
                    {isEditting ? (
                        (cv.GIOI_THIEU || [' ']).map((line, index) => (
                            <TextField
                                multiline
                                fullWidth
                                key={index}
                                variant="standard"
                                value={line}
                                onChange={(e) => {
                                    const updated = [...cv?.GIOI_THIEU];
                                    updated[index] = e.target.value;
                                    handleChange('GIOI_THIEU', updated);
                                }}
                                inputProps={{
                                    style: {
                                        fontSize: '15px',
                                    },
                                }}
                            />
                        ))
                    ) : (
                        <Typography>
                            {cv?.GIOI_THIEU?.map((line) => (
                                <Typography sx={{ fontSize: '15px' }}>{line}</Typography>
                            ))}
                        </Typography>
                    )}

                    <Typography variant="h8" fontWeight="bold" sx={{ marginTop: 2 }}>
                        Kĩ Năng
                    </Typography>

                    <ul>
                        {isEditting
                            ? cv?.KiNangs?.map((line, index) => (
                                  <li>
                                      <TextField
                                          multiline
                                          fullWidth
                                          key={index}
                                          variant="standard"
                                          value={line}
                                          onChange={(e) => {
                                              const updated = [...cv?.KiNangs];
                                              updated[index] = e.target.value;
                                              handleChange('KiNangs', updated);
                                          }}
                                          onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                  e.preventDefault(); // Ngăn chặn xuống dòng trong ô nhập
                                                  const newTasks = [...cv.KiNangs, '']; // Thêm dòng mới
                                                  handleChange('KiNangs', newTasks);
                                              }
                                          }}
                                          inputProps={{
                                              style: {
                                                  fontSize: '15px',
                                              },
                                          }}
                                      />
                                  </li>
                              ))
                            : cv?.KiNangs?.map((line) => <li style={{ fontSize: '15px' }}>{line}</li>)}
                    </ul>

                    {/* Chứng chỉ */}
                    <Typography variant="h8" fontWeight="bold" sx={{ marginTop: 2 }}>
                        Chứng Chỉ
                    </Typography>

                    <ul>
                        {isEditting
                            ? cv?.CHUNG_CHI?.map((line, index) => (
                                  <li>
                                      <TextField
                                          multiline
                                          fullWidth
                                          key={index}
                                          variant="standard"
                                          value={line}
                                          onChange={(e) => {
                                              const updated = [...cv?.CHUNG_CHI];
                                              updated[index] = e.target.value;
                                              handleChange('CHUNG_CHI', updated);
                                          }}
                                          onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                  e.preventDefault(); // Ngăn chặn xuống dòng trong ô nhập
                                                  const newTasks = [...cv.CHUNG_CHI, '']; // Thêm dòng mới
                                                  handleChange('CHUNG_CHI', newTasks);
                                              }
                                          }}
                                          inputProps={{
                                              style: {
                                                  fontSize: '15px',
                                              },
                                          }}
                                      />
                                  </li>
                              ))
                            : cv?.CHUNG_CHI?.map((line) => <li style={{ fontSize: '15px' }}>{line}</li>)}
                    </ul>
                    {/* Education */}
                    <Typography variant="h8" fontWeight="bold" sx={{ marginTop: 2 }}>
                        Học Vấn
                    </Typography>

                    <ul>
                        {isEditting
                            ? cv?.HOC_VAN?.map((line, index) => (
                                  <li>
                                      <TextField
                                          multiline
                                          fullWidth
                                          key={index}
                                          variant="standard"
                                          value={line}
                                          onChange={(e) => {
                                              const updated = [...cv?.HOC_VAN];
                                              updated[index] = e.target.value;
                                              handleChange('HOC_VAN', updated);
                                          }}
                                          onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                  e.preventDefault(); // Ngăn chặn xuống dòng trong ô nhập
                                                  const newTasks = [...cv.HOC_VAN, '']; // Thêm dòng mới
                                                  handleChange('HOC_VAN', newTasks);
                                              }
                                          }}
                                          inputProps={{
                                              style: {
                                                  fontSize: '15px',
                                              },
                                          }}
                                      />
                                  </li>
                              ))
                            : cv?.HOC_VAN?.map((line) => <li style={{ fontSize: '15px' }}>{line}</li>)}
                    </ul>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    {isEditting ? (
                        <TextField
                            multiline
                            fullWidth
                            variant="standard"
                            value={cv?.TEN_CV}
                            inputRef={tenCVRef}
                            placeholder="Nhập tên CV"
                            onChange={(e) => {
                                setErrors({ ...errors, TEN_CV: '' });
                                handleChange('TEN_CV', e.target.value);
                            }}
                            error={!!errors.TEN_CV}
                            helperText={errors.TEN_CV}
                            sx={{ fontWeight: 'bold' }}
                            inputProps={{
                                style: { textAlign: 'center', fontWeight: 'bold' },
                            }}
                        />
                    ) : (
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{cv?.TEN_CV}</Typography>
                    )}
                    {/* Họ tên */}
                    {isEditting ? (
                        <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                multiline
                                fullWidth
                                variant="standard"
                                value={cv?.HO_TEN}
                                inputRef={hoTenRef}
                                placeholder="Nhập họ tên"
                                onChange={(e) => {
                                    handleChange('HO_TEN', e.target.value);
                                    setErrors({ ...errors, HO_TEN: '' });
                                }}
                                error={!!errors.HO_TEN}
                                helperText={errors.HO_TEN}
                                sx={{ fontWeight: 'bold' }}
                                inputProps={{
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                name="NAM_SINH"
                                type="date"
                                variant="standard"
                                value={cv?.NAM_SINH ? cv.NAM_SINH.split('T')[0] : ' '}
                                onChange={(e) => handleChange('NAM_SINH', e.target.value)}
                                margin="normal"
                                placeholder="Ngày sinh"
                                sx={{ width: '100%' }}
                                inputProps={{
                                    style: {
                                        fontSize: '15px',
                                    },
                                }}
                            />
                        </Typography>
                    ) : (
                        <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '18px', fontWeight:"bold" }}>{cv?.HO_TEN}</Typography>
                            {' - '}
                            <Typography sx={{ fontSize: '15px' }}>{cv?.NAM_SINH}</Typography>
                        </Typography>
                    )}

                    {isEditting ? (
                        <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                value={cv?.SDT}
                                inputRef={sdtRef}
                                placeholder="Nhập số điện thoại"
                                onChange={(e) => {
                                    handleChange('SDT', e.target.value);
                                    setErrors({ ...errors, SDT: '' });
                                }}
                                error={!!errors.SDT}
                                helperText={errors.SDT}
                                sx={{ fontWeight: 'bold' }}
                                inputProps={{
                                    style: {
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                            {' - '}
                            <TextField
                                fullWidth
                                variant="standard"
                                value={cv?.EMAIL}
                                placeholder="Ngày email"
                                inputRef={emailRef}
                                onChange={(e) => {
                                    handleChange('EMAIL', e.target.value);
                                    setErrors({ ...errors, EMAIL: '' });
                                }}
                                error={!!errors.EMAIL}
                                helperText={errors.EMAIL}
                                sx={{ width: '100%' }}
                                inputProps={{
                                    style: {
                                        fontSize: '15px',
                                    },
                                }}
                            />
                        </Typography>
                    ) : (
                        <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '15px' }}>{cv?.SDT}</Typography>
                            {' - '}
                            <Typography sx={{ fontSize: '15px' }}>{cv?.EMAIL}</Typography>
                        </Typography>
                    )}

                    {isEditting ? (
                        <TextField
                            multiline
                            fullWidth
                            variant="standard"
                            value={cv?.TP}
                            placeholder="Nhập địa chỉ"
                            onChange={(e) => handleChange('TP', e.target.value)}
                            sx={{ width: '100%' }}
                            inputProps={{
                                style: {
                                    fontSize: '15px',
                                },
                            }}
                        />
                    ) : (
                        <Typography sx={{ fontSize: '15px' }}> {cv?.TP}</Typography>
                    )}

                    {isEditting ? (
                        <TextField
                            multiline
                            fullWidth
                            variant="standard"
                            value={cv?.GITHUB}
                            placeholder="Link github"
                            onChange={(e) => handleChange('GITHUB', e.target.value)}
                            sx={{ width: '100%' }}
                            inputProps={{
                                style: {
                                    fontSize: '15px',
                                },
                            }}
                        />
                    ) : (
                        <Typography sx={{ fontSize: '15px' }}> {cv?.GITHUB}</Typography>
                    )}
                    {/* Mục tiêu nghề nghiệp */}
                    <Typography variant="h8" fontWeight="bold">
                        Mục tiêu nghề nghiệp
                    </Typography>

                    {isEditting ? (
                        <TextField
                            multiline
                            fullWidth
                            variant="standard"
                            value={cv?.MUC_TIEU_NGHE_NGHIEP}
                            placeholder="Mục tiêu nghề nghiệp"
                            onChange={(e) => handleChange('MUC_TIEU_NGHE_NGHIEP', e.target.value)}
                            sx={{ width: '100%' }}
                            inputProps={{
                                style: {
                                    fontSize: '15px',
                                },
                            }}
                        />
                    ) : (
                        <Typography sx={{ fontSize: '15px' }}> {cv?.MUC_TIEU_NGHE_NGHIEP}</Typography>
                    )}

                    {/* Experience */}
                    <Typography variant="h8" fontWeight="bold" sx={{ marginTop: 2 }}>
                        Kinh Nghiệm
                    </Typography>

                    <ul>
                        {isEditting
                            ? cv?.KINH_NGHIEM?.map((line, index) => (
                                  <li>
                                      <TextField
                                          multiline
                                          fullWidth
                                          key={index}
                                          variant="standard"
                                          value={line}
                                          onChange={(e) => {
                                              const updated = [...cv?.KINH_NGHIEM];
                                              updated[index] = e.target.value;
                                              handleChange('KINH_NGHIEM', updated);
                                          }}
                                          onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                  e.preventDefault(); // Ngăn chặn xuống dòng trong ô nhập
                                                  const newTasks = [...cv.KINH_NGHIEM, '']; // Thêm dòng mới
                                                  handleChange('KINH_NGHIEM', newTasks);
                                              }
                                          }}
                                          inputProps={{
                                              style: {
                                                  fontSize: '15px',
                                              },
                                          }}
                                      />
                                  </li>
                              ))
                            : cv?.KINH_NGHIEM?.map((line) => <li style={{ fontSize: '15px' }}>{line}</li>)}
                    </ul>
                    {/* Projects */}
                    <Typography variant="h8" fontWeight="bold" sx={{ marginTop: 2 }}>
                        Dự Án
                        {isEditting && (
                            <Button
                                variant="contained"
                                sx={{ minWidth: 'unset', lineHeight: 1, marginLeft: 2 }}
                                color="primary"
                                onClick={() => {
                                    setProjects([...projects, { TEN_DU_AN: '', MO_TA: '' }]);
                                }}
                            >
                                +
                            </Button>
                        )}
                    </Typography>
                    {projects.map((project, index) => (
                        <>
                            <ProjectCard
                                isEditting={isEditting}
                                key={index}
                                p={project}
                                onChange={(updatedProject) => handleProjectChange(index, updatedProject)}
                            />
                            {isEditting && (
                                <Button
                                    sx={{ minWidth: 'unset', lineHeight: 1, marginLeft: 2 }}
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteProject(index, project.MA_DU_AN)}
                                >
                                    Xóa
                                </Button>
                            )}
                        </>
                    ))}
                </Box>
            </Paper>
            {isEditting && (
                <Button
                    // disabled={!cv.TEN_CV || !cv.HO_TEN}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                    Lưu thay đổi
                </Button>
            )}
        </Box>
    );
};

export default CVPreview;
