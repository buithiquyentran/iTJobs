import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Chip, Box } from '@mui/material';
import './SearchJob.css';
import { StyledInputBase, CustomFilterDropdown } from '~/Components/Search/Search.styles';
import axios from 'axios';

const keywords = ['Java', 'C++', 'JavaScript', 'UI/UX', 'C#', 'Fresher', 'Python', 'PHP', 'Product Owner'];
const addressOptions = ['Cần Thơ', 'Hồ Chí Minh', 'Bình Dương', 'Đà Nẵng', 'Hà Nội'];

function SearchJob() {
    const [jobLevels, setJobLevels] = useState([]);
    const [typeOfWorks, setTypeOfWorks] = useState([]);
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [activeKeyword, setActiveKeyword] = useState([]);
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response1 = await axios.get('http://localhost:5000/cap-bac');
                setJobLevels(response1.data);
                // console.log(response1.data);

                const response2 = await axios.get('http://localhost:5000/loai-hinh');
                setTypeOfWorks(response2.data);
                // console.log(response2.data);

                const response3 = await axios.get('http://localhost:5000/loai-hd');
                setEmploymentTypes(response3.data);
                // console.log(response3.data);
            };
            fetchData();
        } catch (error) {
            console.error('Error fetching data, ', error);
        }
    }, []);

    const [filters, setFilters] = useState({
        address: '',
        jobLevel: '',
        typeOfWork: '',
        employmentType: '',
    });
    const handleSearch = async () => {
        const combineFilter = { ...filters, activeKeyword };
        const {
            address: DIA_CHI,
            jobLevel: CAP_DO,
            typeOfWork: LOAI_HINH,
            employmentType: LOAI_HD,
            activeKeyword: KEY_WORD,
        } = combineFilter;
        console.log({ DIA_CHI, CAP_DO, LOAI_HINH, LOAI_HD, KEY_WORD });
        try {
            const jobFilters = await axios.get('http://localhost:5000/search/jobs', {
                params: {
                    // ✅ Sử dụng "params" để truyền query parameters
                    DIA_CHI,
                    CAP_DO,
                    LOAI_HINH,
                    LOAI_HD,
                    KEY_WORD: KEY_WORD.join(','), // Nếu là mảng, có thể join thành chuỗi để xử lý
                },
            });
            console.log(jobFilters.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };
    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleClearFilter = () => {
        setFilters({
            address: '',
            jobLevel: '',
            typeOfWork: '',
            employmentType: '',
        });
        setActiveKeyword([]);
    };
    const handleClickKeyword = (keyword) => {
        setActiveKeyword((prev) =>
            prev.includes(keyword) ? prev.filter((item) => item !== keyword) : [...prev, keyword],
        );
    };

    return (
        <Box className="search">
            <Typography className="search-name">Tìm kiếm</Typography>
            <Box className="searchbar">
                {/* Input tìm kiếm */}  
                <StyledInputBase
                    placeholder="Nhập từ khóa công việc"
                    inputProps={{ 'aria-label': 'search' }}
                    className="search-input"
                />
                {/* Nút bấm tìm kiếm */}
                <Button onClick={handleSearch} variant="contained" className="search-btn" startIcon={<SearchIcon />}>
                    Tìm kiếm
                </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', mt: 2 }}>
                <span>Đề xuất từ khóa:</span>
                {keywords.map((keyword, index) => {
                    const isActive = activeKeyword.includes(keyword);
                    return (
                        <Chip
                            onClick={() => handleClickKeyword(keyword)}
                            key={index}
                            label={keyword}
                            clickable
                            variant="outlined"
                            sx={{
                                borderRadius: '4px',
                                transition: '0.3s',
                                backgroundColor: isActive ? 'secondary.main' : 'transparent', // Đổi màu khi active
                                color: isActive ? '#fff' : '#000',
                                '&:hover': {
                                    backgroundColor: isActive ? 'transparent !important' : 'secondary.main !important', // Thêm màu hover rõ ràng hơn
                                    color: '#000',
                                },
                            }}
                        />
                    );
                })}
            </Box>
            <Box className="sort-section">
                <CustomFilterDropdown
                    onChange={handleFilterChange}
                    name="address"
                    label="Tất cả địa điểm"
                    options={addressOptions}
                    value={filters.address}
                />

                <CustomFilterDropdown
                    onChange={handleFilterChange}
                    name="jobLevel"
                    label="Tất cả cấp bậc"
                    options={jobLevels}
                    value={filters.jobLevel}
                />
                <CustomFilterDropdown
                    onChange={handleFilterChange}
                    name="typeOfWork"
                    label="Tất cả loại công việc"
                    options={typeOfWorks}
                    value={filters.typeOfWork}
                />
                <CustomFilterDropdown
                    onChange={handleFilterChange}
                    name="employmentType"
                    label="Tất cả loại hợp đồng"
                    options={employmentTypes}
                    value={filters.employmentType}
                />
                <Button onClick={handleClearFilter} variant="contained" startIcon={<FilterAltOffIcon />}>
                    Xóa bộ lọc
                </Button>
            </Box>
        </Box>
    );
}

export default SearchJob;
