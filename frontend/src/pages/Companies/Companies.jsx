import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import './Companies.css';
import Company from '~/Components/Company/Company';
function Companies() {
    const id = 1;
    const [companies, setCompanies] = useState([]);
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
    return (
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
    );
}

export default Companies;
