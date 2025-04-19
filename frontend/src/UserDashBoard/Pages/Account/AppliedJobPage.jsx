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

import ungTuyenService from '~/UserDashBoard/services/ungTuyen.service';
import AuthService from '~/UserDashBoard/services/auth.service';
import TinTuyenDungService from '~/UserDashBoard/services/tinTuyenDung.service';

const AppliedJobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState({});
    const [apply, setApply] = useState({});
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await AuthService.getUserInfo();
                setUser(response);
                const ungTuyen = await ungTuyenService.getByUsername(response.SDT);
                // console.log(ungTuyen);
                const jobs = await Promise.all(
                    ungTuyen.map(async (item) => {
                        let job = await TinTuyenDungService.get(item.MA_TTD);
                        return { ...job, TRANG_THAI: item.TRANG_THAI };
                    }),
                );
                console.log(jobs);
                setJobs(jobs);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <Box sx={{ width: '100%', padding: 3 }} className="setting-page">
            <h2>Việc Đã Ứng Tuyển</h2>
            <Grid container spacing={1} sx={{ padding: 1, borderRadius: 2, paddingLeft: 0 }}>
                {jobs?.map((job, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ position: 'relative', paddingTop: 2 }}>
                            <JobSmall job={job} applying={true} />

                            {/* Hiển thị trạng thái */}

                            <Chip
                                label={
                                    job.TRANG_THAI == 0
                                        ? 'Đang đợi'
                                        : job.TRANG_THAI == 1
                                        ? 'Được chấp nhận'
                                        : 'Từ chối'
                                }
                                color={job.TRANG_THAI == 0 ? 'warning' : job.TRANG_THAI == 1 ? 'success:' : 'error'}
                                size="small"
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AppliedJobPage;
