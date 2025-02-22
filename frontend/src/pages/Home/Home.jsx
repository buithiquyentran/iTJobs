import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider, Stack, Button } from '@mui/material';

import './Home.css';
import Job from '~/Components/Job/Job';
import JobSmall from '~/Components/Job/JobSmall';
import { StyledInputBase, CustomFilterDropdown } from '~/Components/Search/Search.styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import axios from 'axios';
const keywords = ['Java', 'C++', 'JavaScript', 'UI/UX', 'C#', 'Fresher', 'Python', 'PHP', 'Product Owner'];
const addressOptions = ['Cần Thơ', 'Hồ Chí Minh', 'Bình Dương', 'Đà Nẵng', 'Hà Nội'];

function Home() {
    const [jobLevels, setJobLevels] = useState([]);
    const [typeOfWorks, setTypeOfWorks] = useState([]);
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [activeKeyword, setActiveKeyword] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [filterJobIds, setFilterJobIds] = useState([]);
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
                setFilterJobIds([]);
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
        const concatKeyword = [...activeKeyword, keyword];
        console.log(concatKeyword);
        const combineFilter = { ...filters, concatKeyword };
        const {
            address: DIA_CHI,
            jobLevel: CAP_DO,
            typeOfWork: LOAI_HINH,
            employmentType: LOAI_HD,
            concatKeyword: KEY_WORD,
        } = combineFilter;
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
            setFilterJobIds(jobFilters.data.data);
            if (jobFilters.data.data.length == 0) {
                setJobs([]);
            }
            // console.log(jobFilters.data.data);
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
    const handleChange = (event) => {
        const { value } = event.target;
        setKeyword(value);
    };
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recruitments/with-company');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (filterJobIds.length != 0) {
                    const response = await axios.get('http://localhost:5000/recruitments/with-company', {
                        params: { ids: filterJobIds.join(',') },
                    });
                    setJobs(response.data);
                }
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [filterJobIds]);

    return (
        <>
            <Box className="search">
                <Typography className="search-name">Tìm kiếm</Typography>
                <Box className="searchbar">
                    {/* Input tìm kiếm */}
                    <StyledInputBase
                        placeholder="Nhập từ khóa công việc"
                        inputProps={{ 'aria-label': 'search' }}
                        className="search-input"
                        onChange={handleChange}
                        value={keyword}
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
                                        backgroundColor: isActive
                                            ? 'transparent !important'
                                            : 'secondary.main !important', // Thêm màu hover rõ ràng hơn
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    minHeight: '50vh',
                    margin: '24px',
                    width: '100%',
                }}
            >
                <Box sx={{ width: '69%' }}>
                    <Typography variant="h6" fontWeight="bold" marginBottom={1}>
                        {`${jobs?.length} Việc Làm IT`}
                    </Typography>
                    <Box>
                        {jobs?.map((job) => (
                            <Box sx={{ marginY: 1 }} key={job.id}>
                                <Job job={job} />
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Tiêu điểm */}
                <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                    <Typography variant="h6" fontWeight="bold" marginBottom={1}>
                        Tiêu điểm
                    </Typography>
                    {/* Việc làm nổi bậc */}
                    <Card sx={{ marginBottom: 2 }}>
                        <Typography
                            sx={{ padding: 1, backgroundColor: '#ccd6d5', display: 'block', width: '100%' }}
                            variant="h8"
                            fontWeight="bold"
                        >
                            Việc làm nổi bật
                        </Typography>
                        <Divider orientation="horizontal" flexItem />
                        <Box sx={{ padding: 1, borderRadius: 2, paddingLeft: 0 }}>
                            {jobs?.slice(0, 3).map((job, index) => {
                                if (index !== 0) {
                                    return (
                                        <>
                                            <Divider orientation="hertical" flexItem />
                                            <JobSmall job={job} />
                                        </>
                                    );
                                }
                                return <JobSmall job={job} />;
                            })}
                        </Box>
                    </Card>

                    {/* Việc làm phù hợp với bạn */}
                    <Card>
                        <Typography
                            sx={{ padding: 1, backgroundColor: '#ccd6d5', display: 'block', width: '100%' }}
                            variant="h8"
                            fontWeight="bold"
                        >
                            Việc làm phù hợp với bạn
                        </Typography>
                        <Divider orientation="horizontal" flexItem />
                        <Box sx={{ padding: 1, borderRadius: 2, paddingLeft: 0 }}>
                            {jobs?.slice(0, 3).map((job, index) => {
                                if (index !== 0) {
                                    return (
                                        <>
                                            <Divider orientation="hertical" flexItem />
                                            <JobSmall job={job} />
                                        </>
                                    );
                                }
                                return <JobSmall job={job} />;
                            })}
                        </Box>
                    </Card>
                </Box>
            </Box>
        </>
    );
}

export default Home;
