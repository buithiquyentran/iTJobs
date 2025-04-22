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
import CompanySmall from '~/UserDashBoard/Components/Company/CompanySmall';
import NhaTuyenDungService from '~/UserDashBoard/services/nhaTuyenDung.service';
import FollowService from '~/UserDashBoard/services/follow.service';
import AuthService from '~/UserDashBoard/services/auth.service';

const FollowingCompanyPage = () => {
    const [companies, setCompanies] = useState([]);
    const [user, setUser] = useState({});
    const [apply, setApply] = useState({});
    const [followedCompanies, setFollowedCompanies] = useState([]);
    const [MA_NLD, setMA_NLD] = useState('');

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await AuthService.getUserInfo();
                // setUser(response);
                setMA_NLD(response.MA_NLD);
                const follow = await FollowService.getByMA_NLD(response.MA_NLD);
                const companies = await Promise.all(
                    follow.map(async (item) => {
                        return await NhaTuyenDungService.get(item.MA_NTD);
                    }),
                );
                setCompanies(companies);
                setFollowedCompanies(companies.map((item) => item.MA_NTD));
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);
    const handleToggle = (jobId) => {
        setFollowedCompanies((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
    };
    return (
        <Box sx={{ width: '100%', padding: 3 }} className="setting-page">
            <h2>Công ty đang theo dõi</h2>
            <Grid container spacing={1} sx={{ padding: 1, borderRadius: 2, paddingLeft: 0 }}>
                {companies?.map((company, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ position: 'relative', paddingTop: 2 }}>
                            <CompanySmall
                                company={company}
                                followedCompanies={followedCompanies}
                                MA_NLD={MA_NLD}
                                onToggle={handleToggle}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FollowingCompanyPage;
