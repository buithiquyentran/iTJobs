import { Card, CardContent, Typography, Divider, Box, TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

const ProjectCard = ({
    p = {
        TEN_DU_AN: null,
        THOI_GIAN_BAT_DAU: '',
        THOI_GIAN_KET_THUC: '',
        THANH_VIEN: null,
        MO_TA: '',
        CONG_NGHE: '',
        NHIEM_VU: [' '],
    },
    isEditting,
    onChange,
}) => {
    const [project, setProject] = useState(p);
    // Đảm bảo NHIEM_VU luôn có giá trị mảng
    useEffect(() => {
        if (!p.NHIEM_VU) {
            setProject((prev) => ({ ...prev, NHIEM_VU: [''] }));
        }
    }, [p]);

    const handleChange = (field, value) => {
        const updatedProject = { ...project, [field]: value };
        setProject(updatedProject);
        onChange(updatedProject);
    };
    return (
        <Box sx={{ maxWidth: 600, mb: 2, borderRadius: 2, fontSize: '15px' }}>
            <CardContent sx={{ padding: 0 }}>
                {isEditting ? (
                    <TextField
                        multiline
                        fullWidth
                        variant="standard"
                        placeholder="Tên dự án"
                        value={project.TEN_DU_AN}
                        onChange={(e) => handleChange('TEN_DU_AN', e.target.value)}
                        inputProps={{ style: { fontSize: '15px', fontWeight: 'bold' } }}
                    />
                ) : (
                    <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}> {project.TEN_DU_AN}</Typography>
                )}
                {isEditting ? (
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            type="date"
                            // label="Thời gian bắt đầu"
                            value={project.THOI_GIAN_BAT_DAU ? project.THOI_GIAN_BAT_DAU.split('T')[0] : ' '}
                            onChange={(e) => handleChange('THOI_GIAN_BAT_DAU', e.target.value)}
                            inputProps={{ style: { fontSize: '15px' } }}
                            // margin="dense"
                            helperText="Nhập thời gian bắt đầu của dự án"
                        />

                        <TextField
                            fullWidth
                            type="date"
                            variant="standard"
                            value={project.THOI_GIAN_KET_THUC}
                            placeholder="Thời gian kết thúc"
                            onChange={(e) => handleChange('THOI_GIAN_KET_THUC', e.target.value)}
                            inputProps={{ style: { fontSize: '15px' } }}
                            helperText="Nhập thời gian kết thúc của dự án"
                        />
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ fontSize: '15px' }}>{project.THOI_GIAN_BAT_DAU}</Typography>-
                        <Typography sx={{ fontSize: '15px' }}>{project.THOI_GIAN_KET_THUC}</Typography>
                    </Box>
                )}
                {/* Thành viên */}
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ minWidth: '110px', alignSelf: 'center' }}>
                        <strong>Thành viên: </strong>{' '}
                    </Box>
                    {isEditting ? (
                        <TextField
                            fullWidth
                            type="number"
                            min="0"
                            variant="standard"
                            placeholder="Nhập số thành viên của dự án"
                            value={project.THANH_VIEN}
                            onChange={(e) => handleChange('THANH_VIEN', e.target.value)}
                            inputProps={{
                                style: { fontSize: '15px' },

                                min: 0,
                            }}
                        />
                    ) : (
                        <Typography sx={{ fontSize: '15px' }}> {project.THANH_VIEN} </Typography>
                    )}
                </Box>
                {/* Mô tả */}
                <strong>Mô tả: </strong>{' '}
                {/* <TextField
                    multiline
                    fullWidth
                    multiline
                    variant="standard"
                    value={project.MO_TA}
                    placeholder="Mô tả dự án"
                    onChange={(e) => handleChange('MO_TA', e.target.value)}
                    inputProps={{ style: { fontSize: '15px' } }}
                /> */}
                {isEditting ? (
                    <TextField
                        multiline
                        fullWidth
                        variant="standard"
                        placeholder="Mô tả dự án"
                        value={project.MO_TA}
                        onChange={(e) => handleChange('MO_TA', e.target.value)}
                        inputProps={{
                            style: { fontSize: '15px' },
                            inputProps: {
                                min: 0,
                            },
                        }}
                    />
                ) : (
                    <Typography sx={{ fontSize: '15px' }}> {project.MO_TA} </Typography>
                )}
                {/* Công nghệ sử dụng: */}
                <strong>Công nghệ sử dụng: </strong>{' '}
                {/* <TextField
                    multiline
                    fullWidth
                    multiline
                    variant="standard"
                    value={project.CONG_NGHE}
                    placeholder="Nhập công nghệ sử dụng"
                    onChange={(e) => handleChange('CONG_NGHE', e.target.value)}
                    inputProps={{ style: { fontSize: '15px' } }}
                /> */}
                {isEditting ? (
                    <TextField
                        multiline
                        fullWidth
                        variant="standard"
                        placeholder="Nhập công nghệ sử dụng"
                        value={project.CONG_NGHE}
                        onChange={(e) => handleChange('CONG_NGHE', e.target.value)}
                        inputProps={{
                            style: { fontSize: '15px' },
                            inputProps: {
                                min: 0,
                            },
                        }}
                    />
                ) : (
                    <Typography sx={{ fontSize: '15px' }}> {project.CONG_NGHE} </Typography>
                )}
                <strong>Nhiệm vụ:</strong>
                {/* <ul style={{ paddingLeft: '20px', marginTop: 0 }}>
                    {project.NHIEM_VU?.map((task, index) => (
                        <li key={index} style={{ fontSize: '15px' }}>
                            <TextField
                                multiline
                                fullWidth
                                multiline
                                variant="standard"
                                value={task}
                                onChange={(e) => {
                                    const newTasks = [...project.NHIEM_VU];
                                    newTasks[index] = e.target.value;
                                    handleChange('NHIEM_VU', newTasks);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // Ngăn chặn xuống dòng trong ô nhập
                                        const newTasks = [...project.NHIEM_VU, '']; // Thêm dòng mới
                                        handleChange('NHIEM_VU', newTasks);
                                    }
                                }}
                                inputProps={{ style: { fontSize: '15px' } }}
                            />
                        </li>
                    ))}
                </ul> */}
                <ul style={{ paddingLeft: '20px', marginTop: 0 }}>
                    {isEditting
                        ? project?.NHIEM_VU?.map((line, index) => (
                              <li>
                                  <TextField
                                      multiline
                                      fullWidth
                                      key={index}
                                      variant="standard"
                                      value={line}
                                      onChange={(e) => {
                                          const updated = [...project?.NHIEM_VU];
                                          updated[index] = e.target.value;
                                          handleChange('NHIEM_VU', updated);
                                      }}
                                      onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                              e.preventDefault(); // Ngăn chặn xuống dòng trong ô nhập
                                              const newTasks = [...project.NHIEM_VU, '']; // Thêm dòng mới
                                              handleChange('NHIEM_VU', newTasks);
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
                        : project?.NHIEM_VU?.map((line) => <li style={{ fontSize: '15px' }}>{line}</li>)}
                </ul>
            </CardContent>
        </Box>
    );
};

export default ProjectCard;
