import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Chip, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './SearchBlog.css';
import { StyledInputBase } from '~/Components/Search.styles';

const keywords = ['Mới nhất', 'Lập trình', 'HR', 'Phỏng vấn', 'Chuyên gia nói', 'Workshop'];
function SearchBlog() {
    return (
        <Box className="search">
            <Typography className="search-name">Tìm kiếm</Typography>
            <Box className="searchbar">
                {/* Input tìm kiếm */}
                <StyledInputBase
                    placeholder="Nhập chủ đề bạn muốn đọc"
                    inputProps={{ 'aria-label': 'search' }}
                    className="search-input"
                />
                {/* Nút bấm tìm kiếm */}
                <Button variant="contained" className="search-btn" startIcon={<SearchIcon />}>
                    Tìm kiếm
                </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', mt: 2 }}>
                <span>Đề xuất từ khóa:</span>
                {keywords.map((keyword, index) => (
                    <Chip sx={{ borderRadius: '4px' }} key={index} label={keyword} clickable variant="outlined" />
                ))}
            </Box>
        </Box>
    );
}

export default SearchBlog;
