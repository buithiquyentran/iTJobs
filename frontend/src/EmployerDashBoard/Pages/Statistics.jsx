// import React from 'react';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
// const Statistics = () => {
//     return (
//         <Box sx={{ display: 'flex' }}>
//             <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '260px', marginTop: '64px' }}>Jobs page</Box>
//         </Box>
//     );
// };

// export default Statistics;
import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Dữ liệu demo: Tin tuyển dụng
const initialJobs = [
    { id: 1, title: 'Lập trình viên Fullstack', status: 'approved', applicants: 8 },
    { id: 2, title: 'Data Scientist', status: 'pending', applicants: 5 },
    { id: 3, title: 'Chuyên viên Marketing', status: 'rejected', applicants: 2 },
    { id: 4, title: 'Quản trị hệ thống', status: 'approved', applicants: 10 },
    { id: 5, title: 'Phân tích dữ liệu', status: 'pending', applicants: 3 },
];

// Dữ liệu demo: Ứng viên
const initialApplicants = [
    { id: 1, jobId: 1, name: 'Nguyễn Văn A', status: 'approved' },
    { id: 2, jobId: 1, name: 'Trần Thị B', status: 'pending' },
    { id: 3, jobId: 2, name: 'Lê Văn C', status: 'pending' },
    { id: 4, jobId: 3, name: 'Hoàng Thị D', status: 'rejected' },
    { id: 5, jobId: 4, name: 'Phạm Văn E', status: 'approved' },
    { id: 6, jobId: 5, name: 'Võ Minh F', status: 'pending' },
];

// Màu sắc cho biểu đồ
const COLORS = ['#4CAF50', '#FF9800', '#F44336'];

const Statistics = () => {
    const [jobs, setJobs] = useState(initialJobs);
    const [applicants, setApplicants] = useState(initialApplicants);

    // Thống kê trạng thái tin tuyển dụng
    const jobStats = {
        approved: jobs.filter((job) => job.status === 'approved').length,
        pending: jobs.filter((job) => job.status === 'pending').length,
        rejected: jobs.filter((job) => job.status === 'rejected').length,
    };

    // Thống kê trạng thái ứng viên
    const applicantStats = {
        approved: applicants.filter((app) => app.status === 'approved').length,
        pending: applicants.filter((app) => app.status === 'pending').length,
        rejected: applicants.filter((app) => app.status === 'rejected').length,
    };

    // Dữ liệu biểu đồ tròn
    const jobChartData = [
        { name: 'Đã duyệt', value: jobStats.approved },
        { name: 'Chờ duyệt', value: jobStats.pending },
        { name: 'Bị từ chối', value: jobStats.rejected },
    ];

    const applicantChartData = [
        { name: 'Ứng viên đã duyệt', value: applicantStats.approved },
        { name: 'Ứng viên chờ duyệt', value: applicantStats.pending },
        { name: 'Ứng viên bị từ chối', value: applicantStats.rejected },
    ];

    return (
        <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: '260px', marginTop: '64px' }}>
            <Typography variant="h4" gutterBottom>
                📊 Thống kê Nhà Tuyển Dụng
            </Typography>

            {/* 1. Tổng quan tin tuyển dụng */}
            <Typography variant="h6" gutterBottom>
                🗂️ Tổng quan tin tuyển dụng
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary={`Tổng số tin: ${jobs.length}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Tin đã duyệt: ${jobStats.approved}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Tin chờ duyệt: ${jobStats.pending}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Tin bị từ chối: ${jobStats.rejected}`} />
                </ListItem>
            </List>

            {/* 2. Biểu đồ tin tuyển dụng */}
            <Grid container spacing={4} mt={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">📈 Biểu đồ Tin Tuyển Dụng</Typography>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={jobChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {jobChartData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </Grid>

                {/* 3. Biểu đồ ứng viên */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">🧑‍💼 Biểu đồ Ứng Viên</Typography>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={applicantChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {applicantChartData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* 4. Danh sách chi tiết tin tuyển dụng */}
            <Typography variant="h6">📌 Danh sách chi tiết tin tuyển dụng</Typography>
            {jobs.map((job) => (
                <ListItem key={job.id} sx={{ borderBottom: '1px solid #ccc' }}>
                    <ListItemText
                        primary={`${job.title}`}
                        secondary={`Trạng thái: ${job.status} | Số ứng viên: ${job.applicants}`}
                    />
                </ListItem>
            ))}
        </Box>
    );
};

export default Statistics;
