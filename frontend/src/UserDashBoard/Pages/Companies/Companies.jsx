import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { StyledInputBase, CustomFilterDropdown } from '~/UserDashBoard/Components/Search.styles';

import './Companies.css';
import Company from '~/UserDashBoard/Components/Company/Company';
import nhaTuyenDungService from '~/UserDashBoard/services/nhaTuyenDung.service';
import AuthService from '~/UserDashBoard/services/auth.service';
import followService from '~/UserDashBoard/services/follow.service';

const addressOptions = ['Tất cả địa điểm', 'Cần Thơ', 'Hồ Chí Minh', 'Bình Dương', 'Đà Nẵng', 'Hà Nội'];
function Companies() {
    const [companies, setCompanies] = useState([]);
    const [filters, setFilters] = useState([]);
    const [selected, setSelected] = useState('Công Ty Hàng Đầu');
    const [keyword, setKeyword] = useState('');
    const [companyStrings, setCompanyStrings] = useState([]);
    const [followedCompanies, setFollowedCompanies] = useState([]);

    const buttons = [
        'Công Ty Hàng Đầu',
        'Công Ty Được Theo Dõi Nhiều',
        'Công Ty Có Việc Làm Mới Nhất',
        'Công Ty Đang Chờ Đón Bạn',
    ];

    const [address, setFilerAddress] = useState('');
    const [MA_NLD, setMA_NLD] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await nhaTuyenDungService.getAll();
                setCompanies(response);
                setFilters(response);
                const companyString = response.map((company) => {
                    const { TEN_NTD, LOGAN, ABOUT, QUY_MO, QUOC_TICH, DAI_NGO, DIA_CHI_CU_THE, LinhVucs, KiNangs } =
                        company;
                    const LINH_VUC = LinhVucs?.map((item) => item.TEN_LV).join(' ');
                    const KI_NANG = KiNangs?.map((item) => item.TEN_KN).join(' ');
                    return [TEN_NTD, LOGAN, ABOUT, QUY_MO, QUOC_TICH, DAI_NGO, DIA_CHI_CU_THE, LINH_VUC, KI_NANG].join(
                        ' ',
                    );
                });
                // console.log(companyString[0]); 
                setCompanyStrings(companyString);

                const response4 = await AuthService.getUserInfo();
                setMA_NLD(response4.MA_NLD);
                const follow = await followService.getByUsername(response4.MA_NLD);
                // console.log(luuTtd.map((item) => item.MA_TTD));
                setFollowedCompanies(follow.map((item) => item.MA_NTD));
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
        const keywords = [keyword.trim(), address];
        if (keywords) {
            const filters = companies?.filter((_company, index) =>
                keywords.every((keyword) =>
                    companyStrings[index]?.trim().toLowerCase().includes(keyword.toLowerCase().trim()),
                ),
            );
            setFilters(filters);
        }
    };
    // Khi bấm Follow/Unfol low, cập nhật danh sách tin đã lưu
    const handleToggle = (jobId) => {
        setFollowedCompanies((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
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
                    {filters?.length} Công Ty IT
                </Typography>
                <Grid container spacing={1}>
                    {filters.map((company) => (
                        <Grid size={3}>
                            <Company
                                company={company}
                                followedCompanies={followedCompanies}
                                MA_NLD={MA_NLD}
                                onToggle={handleToggle}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default Companies;
