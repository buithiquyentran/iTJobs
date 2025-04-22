import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Chip, Divider, Stack, Button } from '@mui/material';
import LuuTtdService from '~/UserDashBoard/services/luuTtd.service';

const Job = ({ job, saveJobs, username, onToggleSave }) => {
    const [isSaved, setIsSaved] = useState(false);

    // Cập nhật lại trạng thái khi saveJobs thay đổi
    useEffect(() => {
        setIsSaved(saveJobs?.includes(job.MA_TTD));
    }, [saveJobs, job.MA_TTD]);
    const navigate = useNavigate();
    const handleSaveRecruiment = async (event) => {
        event.stopPropagation();
        try {
            if (isSaved) {
                await LuuTtdService.delete(username, job.MA_TTD);
            } else {
                const data = { SDT: username, MA_TTD: job.MA_TTD };
                await LuuTtdService.create(data);
            }
            setIsSaved((prev) => !prev);
            // Gửi sự kiện lên component cha để cập nhật danh sách lưu
            onToggleSave(job.MA_TTD);
        } catch (error) {
            console.log(error);
        }
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
                        // src={job.NhaTuyenDung.LOGO}
                        src={
                            job.NhaTuyenDung.LOGO?.startsWith('/uploads/')
                                ? `http://localhost:5000${job.NhaTuyenDung.LOGO}`
                                : job.NhaTuyenDung.LOGO
                        }
                        alt="Company Logo"
                        sx={{ width: 180, borderRadius: 1, mr: 2 }}
                    />
                    {/* Job Title & Company Name */}
                    <Box flexGrow={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'left' }}>
                                {job.TEN_TTD}
                            </Typography>
                            <Button
                                sx={{ minWidth: '86px' }}
                                variant="outlined"
                                size="small"
                                onClick={handleSaveRecruiment}
                            >
                                {isSaved ? 'Bỏ lưu' : 'Lưu'}
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
