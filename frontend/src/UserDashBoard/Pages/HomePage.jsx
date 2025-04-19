import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, TextField } from '@mui/material';

const HomePage = () => {
    return (
        <Box sx={{ mt: 0 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    // backgroundColor: '#004d40',
                    color: 'white',
                    height: '800px',
                    py: 8,
                    textAlign: 'center',
                    backgroundImage: 'url("/banner.png")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Container maxWidth="md">
                    {/* <Typography variant="h3" gutterBottom>
                        Kết nối Nhà Tuyển Dụng và Nhân Tài CNTT
                    </Typography>
                    <Typography variant="h6" paragraph>
                        Nền tảng tìm kiếm việc làm và quản lý CV thông minh dành riêng cho ngành CNTT
                    </Typography> */}
                    <Button variant="contained" color="secondary" size="large" sx={{ mt: 3 }}>
                        Tìm Việc Ngay
                    </Button>
                </Container>
            </Box>

            {/* Thanh Tìm Kiếm Nhanh */}
            <Container sx={{ py: 5 }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label="Từ khóa" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label="Địa điểm" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button fullWidth variant="contained" color="primary">
                            Tìm kiếm
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            {/* Tính năng nổi bật */}
            <Box sx={{ backgroundColor: '#f5f5f5', py: 6 }}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Tính Năng Nổi Bật
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {[
                            { title: 'Tạo CV Online', desc: 'Thiết kế CV dễ dàng và lưu trữ trên hệ thống' },
                            { title: 'Tìm kiếm việc làm', desc: 'Tìm việc theo kỹ năng, vị trí, mức lương' },
                            { title: 'Quản lý hồ sơ', desc: 'Theo dõi tình trạng ứng tuyển, sửa CV dễ dàng' },
                            {
                                title: 'Thông báo tự động',
                                desc: 'Nhận thông báo khi có việc phù hợp hoặc có người ứng tuyển',
                            },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2">{item.desc}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Việc làm nổi bật */}
            <Container sx={{ py: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Việc Làm Nổi Bật
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {[1, 2, 3].map((job) => (
                        <Grid item xs={12} sm={6} md={4} key={job}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Backend Developer (Java)</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Công ty ABC • Hà Nội
                                    </Typography>
                                    <Button sx={{ mt: 1 }} variant="outlined" size="small">
                                        Xem chi tiết
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;
