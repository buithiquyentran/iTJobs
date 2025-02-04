import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Chip, Divider, Stack, Button } from '@mui/material';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const handleSaveRecruiment = (event) => {
        event.stopPropagation();
    };
    const handleSearch = (event) => {
        event.stopPropagation();
        console.log('click');
    };
    return (
        <Card
            onClick={() => navigate(`/job/${job.MA_TTD}`)}
            sx={{
                boxShadow: 3,
                borderRadius: 2,
                width: '100%',
                cursor: 'pointer',
            }}
        >
            <CardContent sx={{ paddingBottom: 2 }}>
                {/* Header */}
                <Box display="flex" alignItems="center">
                    {/* Logo */}
                    <Box
                        component="img"
                        src={job.NhaTuyenDung.LOGO}
                        alt="Company Logo"
                        sx={{ width: 180, borderRadius: 1, mr: 2 }}
                    />
                    {/* Job Title & Company Name */}
                    <Box flexGrow={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'left' }}>
                                {job.TEN_TTD}
                            </Typography>
                            <Button variant="outlined" size="small" onClick={handleSaveRecruiment}>
                                Lưu
                            </Button>
                        </Stack>
                        <Typography sx={{ textAlign: 'left' }} color="text.secondary" variant="body2">
                            {job.NhaTuyenDung.TEN_NTD}
                        </Typography>
                        {/* Salary and Level */}
                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                            <Typography color="error">{job.MUC_LUONG}</Typography>
                            <Divider orientation="vertical" flexItem />
                            <Box>
                                {job.CapBacs.map((c) => c.TEN_CB).map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            padding: '4px',
                                            fontSize: '16px',
                                            height: 'unset',
                                            marginRight: '2px',
                                            '&:hover': {
                                                backgroundColor: 'var(--mui-palette-action-selected)',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        onClick={handleSearch}
                                    />
                                ))}
                            </Box>
                        </Stack>
                        {/* Location */}
                        <Typography sx={{ textAlign: 'left' }} color="text.secondary" variant="body2" mb={2}>
                            {job.DIA_CHI}
                        </Typography>
                        <Divider orientation="hertical" flexItem />
                        {/* Tags */}
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                marginTop: 'calc(2* var(--mui-spacing))',
                                marginBottom: '12px',
                            }}
                        >
                            {job.KiNangs.map((k) => k.TEN_KN).map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    clickable
                                    color="primary"
                                    size="small"
                                    sx={{
                                        borderRadius: '4px',
                                        padding: '4px',
                                        fontSize: '16px',
                                        height: 'unset',
                                    }}
                                    onClick={handleSearch}
                                />
                            ))}
                        </Box>

                        <Typography sx={{ textAlign: 'right' }} color="text.secondary" variant="body2">
                            Đăng 6 giờ trước
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Job;
