import React, { useState } from 'react';

import Grid from '@mui/material/Grid2';

import { Box, Typography, TextField, Button, Paper, Link, Tabs, Tab } from '@mui/material';
import RegisterEmployee from '~/Components/RegisterEmployee';
import RegisterEmployer from '~/Components/RegisterEmployer';

const RegisterForm = ({ switchToLogin }) => {
    const [selected, setSelected] = useState('Người lao động');
    const handleChange = (value) => {
        setSelected(value); // Cập nhật nút được chọn
    };
    return (
        <Box component="form" sx={{ mt: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end', // Canh sang phải
                    width: '50%',
                    right: 0,
                    top: '78px',
                    position: 'absolute',
                    paddingRight: '32px',
                }}
            >
                <Button
                    variant={selected === 'Người lao động' ? 'contained' : 'outlined'}
                    sx={{ width: '50%', borderRadius: 0 }}
                    onClick={() => handleChange('Người lao động')}
                >
                    Người lao động
                </Button>
                <Button
                    variant={selected === 'Nhà tuyển dụng' ? 'contained' : 'outlined'}
                    sx={{
                        width: '50%',
                        borderRadius: 0,
                    }}
                    onClick={() => handleChange('Nhà tuyển dụng')}
                >
                    Nhà tuyển dụng
                </Button>
            </Box>

            {/* Form */}
            {selected === 'Người lao động' ? (
                <RegisterEmployee switchToLogin={switchToLogin} />
            ) : (
                <RegisterEmployer switchToLogin={switchToLogin} />
            )}
        </Box>
    );
};
export default RegisterForm;
