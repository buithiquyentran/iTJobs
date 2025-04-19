import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Card, CardContent, Typography, Box, Chip, Divider, Stack, Button } from '@mui/material';
import LuuTtdService from '~/UserDashBoard/services/luuTtd.service';

const JobSmall = ({ job, saveJobs, username, onToggleSave, applying }) => {
    const [isSaved, setIsSaved] = useState(true);
    // Cập nhật lại trạng thái khi saveJobs thay đổi
    useEffect(() => {
        setIsSaved(saveJobs?.includes(job.MA_TTD));
    }, [saveJobs, job.MA_TTD]);
    const navigate = useNavigate();
    const handleSearch = (event) => {
        event.stopPropagation();
        console.log('click');
    };
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
    return (
        <Card
            onClick={() => navigate(`/job/${job.MA_TTD}`)}
            sx={{
                boxShadow: 3,
                borderRadius: 2,
                height: '180px',
                
                width: '100%',
                cursor: 'pointer',
                borderRadius: 'none',
                padding: 0,
            }}
        >
            <CardContent sx={{ paddingBottom: 0, width: '100%', marginBottom: 1, position: 'relative' }}>
                {/* Header */}
                <Box sx={{ padding: 0 }} display="flex" alignItems="center">
                    {/* Logo */}
                    <Box
                        component="img"
                        src={job.NhaTuyenDung.LOGO}
                        alt="Company Logo"
                        sx={{ width: 112, borderRadius: 1, mr: 2 }}
                    />
                    {/* JobSmall Title & Company Name */}
                    <Box>
                        <Box alignItems="center">
                            <Typography
                                sx={{
                                    display: 'block',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '373px',
                                }}
                                variant="h9"
                                fontWeight="bold"
                            >
                                {job.TEN_TTD}
                            </Typography>
                            {!applying && (
                                <Button
                                    sx={{ minWidth: '50px', position: 'absolute', top: '1px', right: '1px' }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleSaveRecruiment}
                                >
                                    {isSaved ? <StarIcon /> : <StarBorderIcon />}
                                </Button>
                            )}
                        </Box>
                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                // width: '286px',
                                width: '100%',
                            }}
                            color="text.secondary"
                            variant="body2"
                        >
                            {job.NhaTuyenDung.TEN_NTD}
                        </Typography>

                        <Typography color="text.secondary" variant="body2" mb={2}>
                            {job.DIA_CHI}
                        </Typography>
                        {/* Tags */}
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                                overflow: 'hidden',
                                marginTop: 2,
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
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobSmall;
