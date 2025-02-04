import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider, Stack, Button } from '@mui/material';

import './Home.css';
import Job from '~/Components/Job/Job';
import JobSmall from '~/Components/Job/JobSmall';

import axios from 'axios';
function Home() {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recruitments/with-company');
                setJobs(response.data);
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
    );
}

export default Home;
