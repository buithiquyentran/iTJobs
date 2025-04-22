import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardMedia, CardContent, Typography, Box, Button, Chip, Tooltip, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import followService from '~/UserDashBoard/services/follow.service';
import './Company.css';
const Company = ({ company, followedCompanies, MA_NLD, onToggle }) => {
    const navigate = useNavigate();
    const [followed, setFollowed] = useState(false);
    // Cập nhật lại trạng thái khi saveJobs thay đổi
    useEffect(() => {
        setFollowed(followedCompanies?.includes(company.MA_NTD));
    }, [followedCompanies, MA_NLD]);
    const toggleBookmark = async (event) => {
        event.stopPropagation();
        try {
            if (followed) {
                await followService.delete(MA_NLD, company.MA_NTD);
            } else {
                const data = { MA_NLD: MA_NLD, MA_NTD: company.MA_NTD };
                await followService.create(data);
            }
            setFollowed((prev) => !prev);
            onToggle(company.MA_NTD);
        } catch (error) {
            console.log(error);
        }
        // setFollowed((prev) => !prev);
        console.log(followed ? 'Removed Bookmark!' : 'Bookmarked!');
    };

    return (
        <Card
            onClick={() => navigate(`/company/${company.MA_NTD}`)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                overflow: 'hidden',
                borderRadius: 'none',
                height: '461px',
            }}
        >
            {/* Hình ảnh */}
            <Box className="company-banner">
                <CardMedia
                    component="img"
                    height="100%"
                    image={
                        company?.IMG
                            ? company?.IMG?.startsWith('/uploads/')
                                ? `http://localhost:5000${company.IMG}`
                                : company?.IMG
                            : 'https://salt.topdev.vn/MR1Y_GUMkKRo91V8JpXGjJq1ZkY8rIhxfxBdl5g1nN4/auto/310/250/ce/1/aHR0cHM6Ly90b3BkZXYudm4vYXNzZXRzL2Rlc2t0b3AvaW1hZ2VzL2NvbXBhbnktc2NlbmUtMy5wbmc/company-scene-3.jpg'
                    }
                    alt="Job banner"
                />
                <Box sx={{ padding: 2, display: 'flex' }}>
                    <CardMedia
                        className="company-logo"
                        component="img"
                        sx={{
                            width: '160px',
                            borderRadius: 1,
                            marginRight: 2,
                        }}
                        image={company.LOGO}
                        alt="Company logo"
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            marginLeft: '157px',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 2, // Giới hạn 3 dòng
                            textOverflow: 'ellipsis',
                            marginBottom: '24px',
                        }}
                    >
                        {company.TEN_NTD}
                    </Typography>
                </Box>
                <Tooltip
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        background: '#fff',
                        borderRadius: 0,
                        borderTopRightRadius: 2,
                        padding: '8px',
                        '&:hover': {
                            background: '#fff',
                        },
                    }}
                    title={followed ? 'Bỏ theo dõi' : 'Theo dõi'}
                >
                    <IconButton onClick={toggleBookmark} color="error" size="large">
                        {followed ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </Tooltip>
            </Box>
            {/* Chi tiết */}
            <Box sx={{ padding: 1, marginTop: '99px' }}>
                <Typography variant="body2" color="text.main" noWrap>
                    {company.LOGAN}
                </Typography>
                <CardContent sx={{ padding: 0 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {company.DIA_CHI}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            marginTop: 1,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '249px',
                            }}
                            color="text.secondary"
                        >
                            {company.LinhVucs?.map((item) => item.TEN_LV).join(', ')}
                        </Typography>
                        {/* Nút Chi tiết */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }}>
                            <Button
                                size="small"
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                }}
                                color="primary"
                            >
                                Chi tiết →
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default Company;
