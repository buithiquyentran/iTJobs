import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Box, Chip, Divider, Stack, Button, Tooltip, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import followService from '~/UserDashBoard/services/follow.service';

const CompanySmall = ({ company, followedCompanies, MA_NLD, onToggle }) => {
    const navigate = useNavigate();
    const handleSearch = (event) => {
        event.stopPropagation();
    };
    const [followed, setFollowed] = useState(true);
    useEffect(() => {
        setFollowed(followedCompanies?.includes(company.MA_NTD));
    }, [followedCompanies, MA_NLD]);
    const toggleBookmark = async (event) => {
        event.stopPropagation();
        // alert(followedCompanies, MA_NLD);
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
        console.log(followed ? 'Removed Bookmark!' : 'Bookmarked!');
    };
    return (
        <Card
            onClick={() => navigate(`/company/${company.MA_NTD}`)}
            sx={{
                boxShadow: 3,
                borderRadius: 2,
                height: '207px',
                width: '100%',
                cursor: 'pointer',
                borderRadius: 'none',
                // boxShadow: 'none',
                padding: 0,
            }}
        >
            <CardContent sx={{ paddingBottom: 0, width: '100%', marginBottom: 1 }}>
                {/* Header */}
                <Box sx={{ padding: 0 }} display="flex" alignItems="center">
                    {/* Logo */}
                    <Box
                        component="img"
                        src={company.LOGO}
                        alt="Company Logo"
                        sx={{ width: 112, borderRadius: 1, mr: 2 }}
                    />
                    <Tooltip
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: '16px',
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
                    {/* CompanySmall Title & Company Name */}
                    <Box>
                        <Box alignItems="center">
                            <Typography
                                sx={{
                                    display: 'block',
                                    whiteSpace: 'nowrap',
                                    // overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '286px',
                                    // width: '100%',
                                }}
                                variant="h9"
                                fontWeight="bold"
                            >
                                {company.TEN_NTD}
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
                            {company?.LOGAN}
                        </Typography>

                        <Typography color="text.secondary" variant="body2" mb={2}>
                            {company?.DIA_CHI}
                        </Typography>
                        <Typography color="text.secondary" variant="body2" mb={2}>
                            {company?.LinhVucs?.map((item) => item.TEN_LV)}
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
                            {company.KiNangs.map((k) => k.TEN_KN).map((tag, index) => (
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

export default CompanySmall;
