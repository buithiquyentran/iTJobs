import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Container,
    Typography,
    Card,
    CardContent,
    MenuItem,
    Box,
    Divider,
    Grid,
    Chip,
} from '@mui/material';
import JobSmall from '~/UserDashBoard/Components/Job/JobSmall';

import LuuTtdService from '~/UserDashBoard/services/luuTtd.service';
import AuthService from '~/UserDashBoard/services/auth.service';
import TinTuyenDungService from '~/UserDashBoard/services/tinTuyenDung.service';

const SaveJobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [saveJobs, setSaveJobs] = useState([]);
    const [username, setUsername] = useState('');
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await AuthService.getUserInfo();
                setUsername(response.SDT);

                const luuTtd = await LuuTtdService.getByUsername(response.SDT);
                const jobs = await Promise.all(
                    luuTtd.map(async (item) => {
                        return await TinTuyenDungService.get(item.MA_TTD);
                    }),
                );
                // console.log(jobs);
                setJobs(jobs);
                setSaveJobs(luuTtd.map((item) => item.MA_TTD));
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);
    // Khi bấm Lưu / Bỏ lưu, cập nhật danh sách tin đã lưu
    const handleToggleSave = (jobId) => {
        setSaveJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
    };
    return (
        <Box sx={{ width: '100%', padding: 3 }} className="setting-page">
            <h2>Việc Đã Lưu</h2>
            <Grid container spacing={1} sx={{ padding: 1, borderRadius: 2, paddingLeft: 0 }}>
                {jobs?.map((job, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ position: 'relative', paddingTop: 2 }}>
                            <JobSmall
                                job={job}
                                saveJobs={saveJobs}
                                username={username}
                                onToggleSave={handleToggleSave}
                                
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SaveJobPage;
