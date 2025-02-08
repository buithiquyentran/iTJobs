import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Chip, Divider, Stack, Button } from '@mui/material';

const JobSmall = ({ job }) => {
    const navigate = useNavigate();
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
                maxHeight: '200px',
                width: '100%',
                cursor: 'pointer',
                borderRadius: 'none',
                boxShadow: 'none',
                padding: 0,
            }}
        >
            <CardContent sx={{ paddingBottom: 0, maxWidth: '100%', marginBottom: 1 }}>
                {/* Header */}
                <Box sx={{ padding: 0 }} display="flex" alignItems="center">
                    {/* Logo */}
                    <Box
                        component="img"
                        src={job.NhaTuyenDung.LOGO}
                        alt="Company Logo"
                        sx={{ width: 80, borderRadius: 1, mr: 2 }}
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
                                    width: '286px',
                                }}
                                variant="h9"
                                fontWeight="bold"
                            >
                                {job.TEN_TTD}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '286px',
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
