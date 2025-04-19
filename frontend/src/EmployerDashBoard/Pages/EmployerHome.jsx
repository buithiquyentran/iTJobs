import { useState } from 'react';

import { Box, Typography, Grid, Button, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const metrics = [
    { label: 'Tin tuyển dụng', value: 12 },
    { label: 'Ứng viên mới', value: 35 },
    { label: 'Lượt xem hồ sơ', value: 500 },
    { label: 'Tỉ lệ chấp nhận', value: '45%' },
];

const chartData = [
    { month: 'Tháng 8', candidates: 20 },
    { month: 'Tháng 9', candidates: 45 },
    { month: 'Tháng 10', candidates: 35 },
];

const jobs = [
    { title: 'Backend Developer', date: '2023-11-01', status: 'Đang tuyển', applicants: 25 },
    { title: 'Data Analyst', date: '2023-10-20', status: 'Hết hạn', applicants: 12 },
];

const notifications = [
    'Ứng viên Nguyễn Văn A vừa ứng tuyển vào vị trí Backend Developer.',
    'Tin tuyển dụng "Fullstack Developer" sẽ hết hạn sau 3 ngày.',
];

const EmployerHome = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '260px', marginTop: '64px' }}>
            {/* Tiêu đề */}
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Tổng quan
            </Typography>

            {/* Chỉ số chính */}
            <Grid container spacing={3} mb={4}>
                {metrics.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    {item.label}
                                </Typography>
                                <Typography variant="h4">{item.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Biểu đồ thống kê */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Thống kê ứng viên theo tháng
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="candidates" fill="#3f51b5" />
                </BarChart>
            </ResponsiveContainer>

            {/* Danh sách tin tuyển dụng */}
            <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
                Tin tuyển dụng gần đây
            </Typography>
            <List>
                {jobs.map((job, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={job.title}
                            secondary={`Ngày đăng: ${job.date} - ${job.status} - Ứng viên: ${job.applicants}`}
                        />
                    </ListItem>
                ))}
            </List>
            {/* Thông báo hệ thống */}
            <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
                Thông báo
            </Typography>
            <List>
                {notifications.map((note, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={note} />
                    </ListItem>
                ))}
            </List>
            {/* Lối tắt nhanh */}
            <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>
                Lối tắt nhanh
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <Button variant="contained" color="primary" component={Link} to="/my-recruiments">
                        ➕ Tạo tin tuyển dụng
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" component={Link} to="/my-candidates">
                        👤 Xem ứng viên
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EmployerHome;
