import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider, Stack, Button } from '@mui/material';
import './Jobs.css';
import Job from '~/UserDashBoard/Components/Job/Job';
import JobSmall from '~/UserDashBoard/Components/Job/JobSmall';
import { StyledInputBase, CustomFilterDropdown } from '~/UserDashBoard/Components/Search.styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import TinTuyenDungService from '~/UserDashBoard/services/tinTuyenDung.service';
import CapBacService from '~/UserDashBoard/services/capBac.service';
import LoaiHinhService from '~/UserDashBoard/services/loaiHinh.service';
import LoaiHopDongService from '~/UserDashBoard/services/loaiHopDong.service';
import LuuTtdService from '~/UserDashBoard/services/luuTtd.service';
import AuthService from '~/UserDashBoard/services/auth.service';
const keywords = ['Java', 'C++', 'JavaScript', 'UI/UX', 'C#', 'Fresher', 'Python', 'PHP', 'Product Owner'];
const addressOptions = ['Cần Thơ', 'Hồ Chí Minh', 'Bình Dương', 'Đà Nẵng', 'Hà Nội'];
import tinTuyenDungService from '~/UserDashBoard/services/tinTuyenDung.service';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [suggestedJobs, setSuggestedJobs] = useState([]);

    const [jobLevels, setJobLevels] = useState([]);
    const [typeOfWorks, setTypeOfWorks] = useState([]);
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [activeKeyword, setActiveKeyword] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [filterJobs, setFilterJobs] = useState([]);
    const [filters, setFilters] = useState({
        address: '',
        jobLevel: '',
        typeOfWork: '',
        employmentType: '',
    });
    const [jobStrings, setJobStrings] = useState([]);
    const [saveJobs, setSaveJobs] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response1 = await CapBacService.getAll();
                setJobLevels(response1.map((item) => item.TEN_CB));

                const response2 = await LoaiHinhService.getAll();
                setTypeOfWorks(response2.map((item) => item.TEN_LOAI_HINH));

                const response3 = await LoaiHopDongService.getAll();
                setEmploymentTypes(response3.map((item) => item.TEN_LOAI_HD));

                const response4 = await AuthService.getUserInfo();
                setUsername(response4.SDT);
                const luuTtd = await LuuTtdService.getByUsername(response4.SDT);
                // console.log(luuTtd.map((item) => item.MA_TTD));
                setSaveJobs(luuTtd.map((item) => item.MA_TTD));

                const response5 = await tinTuyenDungService.getSuggestedCaNhan(response4.MA_NLD);
                setSuggestedJobs(response5);
            };
            fetchData();
        } catch (error) {
            console.error('Error fetching data, ', error);
        }
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobs = await TinTuyenDungService.getAll();
                setJobs(jobs);
                setFilterJobs(jobs);
                const jobString = jobs.map((job) => {
                    const {
                        TEN_TTD,
                        NGAY,
                        MUC_LUONG,
                        TRACH_NHIEM,
                        CHUYEN_MON,
                        NICE_TO_HAVE,
                        PHUC_LOI,
                        QUI_TRINH_PV,
                        CapBacs,
                        KiNangs,
                        NhaTuyenDung,
                        LoaiHinh,
                        LoaiHopDong,
                    } = job;
                    const CAP_BAC = CapBacs.map((item) => item.TEN_CB).join(' ');
                    const KI_NANG = KiNangs.map((item) => item.TEN_KN).join(' ');
                    const { TEN_NTD, LOGAN, QUY_MO, QUOC_TICH, ABOUT, DAI_NGO, DIA_CHI_CU_THE } = NhaTuyenDung;
                    const NHA_TUYEN_DUNG = [
                        TEN_NTD,
                        LOGAN,
                        QUY_MO,
                        QUOC_TICH,
                        ABOUT?.join(' '),
                        DAI_NGO?.join(' '),
                        DIA_CHI_CU_THE?.join(' '),
                    ].join(' ');
                    return [
                        TEN_TTD,
                        NGAY,
                        MUC_LUONG,
                        TRACH_NHIEM,
                        CHUYEN_MON,
                        NICE_TO_HAVE,
                        PHUC_LOI,
                        QUI_TRINH_PV,
                        CAP_BAC,
                        KI_NANG,
                        NHA_TUYEN_DUNG,
                        LoaiHinh.TEN_LOAI_HINH,
                        LoaiHopDong.TEN_LOAI_HD,
                    ].join(' ');
                });
                setJobStrings(jobString);
                // console.log(jobString[0]);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    // Khi bấm Lưu / Bỏ lưu, cập nhật danh sách tin đã lưu
    const handleToggleSave = (jobId) => {
        setSaveJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
    };

    const handleSearch = async () => {
        const concatKeyword = [...new Set([...activeKeyword, keyword].map((k) => k.toLowerCase()))];

        console.log(concatKeyword);
        const combineFilter = { ...filters, concatKeyword };
        const {
            address: DIA_CHI,
            jobLevel: CAP_DO,
            typeOfWork: LOAI_HINH,
            employmentType: LOAI_HD,
            concatKeyword: KEY_WORD,
        } = combineFilter;
        const keywords = [DIA_CHI, CAP_DO, LOAI_HINH, LOAI_HD, KEY_WORD.join(' ')];
        // console.log(keywords);
        if (keywords && keywords.length > 0) {
            const jobFilter = jobs?.filter((_job, index) =>
                keywords.every((keyword) =>
                    jobStrings[index]?.trim().toLowerCase().includes(keyword.toLowerCase().trim()),
                ),
            );

            // console.log(jobFilter);
            setFilterJobs(jobFilter);
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
    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     setKeyword(value);
    //     debouncedSearch(value);
    // };
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
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(); // Gọi hàm tìm kiếm
                            }
                        }}
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
                        {`${filterJobs?.length} Việc Làm IT`}
                    </Typography>
                    <Box>
                        {filterJobs?.map((job) => (
                            <Box sx={{ marginY: 1 }} key={job.id}>
                                <Job
                                    job={job}
                                    saveJobs={saveJobs}
                                    username={username}
                                    onToggleSave={handleToggleSave}
                                />
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
                                            <JobSmall job={job} applying={true} />
                                        </>
                                    );
                                }
                                return <JobSmall job={job} applying={true} />;
                            })}
                        </Box>
                    </Card>

                    {/* Việc làm phù hợp với bạn */}
                    <Card>
                        <Typography
                            sx={{
                                padding: 1,
                                backgroundColor: '#ccd6d5',
                                display: 'block',
                                width: '100%',
                                marginTop: 2,
                            }}
                            variant="h8"
                            fontWeight="bold"
                        >
                            Việc làm phù hợp với bạn
                        </Typography>
                        <Divider orientation="horizontal" flexItem />
                        <Box sx={{ padding: 1, borderRadius: 2, paddingLeft: 0 }}>
                            {suggestedJobs?.map((job, index) => {
                                if (index !== 0) {
                                    return (
                                        <>
                                            <Divider orientation="hertical" flexItem />
                                            <JobSmall job={job} applying={true} />
                                        </>
                                    );
                                }
                                return <JobSmall job={job} applying={true} />;
                            })}
                        </Box>
                    </Card>
                </Box>
            </Box>
        </>
    );
}

export default Jobs;
