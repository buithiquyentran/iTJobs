import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { StyledInputBase, CustomFilterDropdown } from '~/Components/Search/Search.styles';

import './Companies.css';
import Company from '~/Components/Company/Company';
const addressOptions = ['Tất cả địa điểm', 'Cần Thơ', 'Hồ Chí Minh', 'Bình Dương', 'Đà Nẵng', 'Hà Nội'];
function Companies() {
    const [companies, setCompanies] = useState([]);
    const [selected, setSelected] = useState('Công Ty Hàng Đầu');
    const [keyword, setKeyword] = useState('');

    const buttons = [
        'Công Ty Hàng Đầu',
        'Công Ty Được Theo Dõi Nhiều',
        'Công Ty Có Việc Làm Mới Nhất',
        'Công Ty Đang Chờ Đón Bạn',
    ];
    const [address, setFilerAddress] = useState('');
    // const [filterCompanyIds, setFilterCompanyIds] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/employers');
                setCompanies(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const handleFilterChange = (name, value) => {
        if (value == 'Tất cả địa điểm') {
            setFilerAddress('');
            return;
        }
        setFilerAddress(value);
    };
    const handleChange = (event) => {
        const { value } = event.target;
        setKeyword(value);
    };
    const handleSearch = async () => {
        console.log(keyword, address);
        try {
            const filterCompany = await axios.get('http://localhost:5000/search/companies', {
                params: {
                    keyword,
                    address,
                },
            });
            console.log(filterCompany.data);
            setCompanies(filterCompany.data);
        } catch (error) {
            console.error('Error', error);
        }
    };
    return (
        <>
            <Box className="search">
                <Typography className="search-name">Tìm kiếm</Typography>
                <Box className="searchbar">
                    {/* Input tìm kiếm */}
                    <StyledInputBase
                        placeholder="Nhập từ khóa công ty"
                        inputProps={{ 'aria-label': 'search' }}
                        className="search-input"
                        onChange={handleChange}
                        value={keyword}
                    />
                    <CustomFilterDropdown
                        onChange={handleFilterChange}
                        name="address"
                        label="Tất cả địa điểm"
                        options={addressOptions}
                        value={address}
                    />
                    {/* Nút bấm tìm kiếm */}
                    <Button
                        onClick={handleSearch}
                        variant="contained"
                        className="search-btn"
                        startIcon={<SearchIcon />}
                    >
                        Tìm kiếm
                    </Button>
                </Box>
                <Box className="company-sort">
                    {buttons.map((label) => (
                        <Button
                            key={label}
                            variant={selected === label ? 'contained' : 'outlined'}
                            className="company-sort-btn"
                            onClick={() => setSelected(label)} // Cập nhật trạng thái khi click
                        >
                            {label}
                        </Button>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: '50vh',
                    margin: '24px',
                    cursor: 'pointer',
                }}
            >
                <Typography variant="h6" fontWeight="bold" marginBottom={1}>
                    {companies?.length} Công Ty IT
                </Typography>
                <Grid container spacing={1}>
                    {companies.map((company) => (
                        <Grid size={3}>
                            <Company company={company} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default Companies;
