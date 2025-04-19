import { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, ListItemButton } from '@mui/material';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
// import { useLocation, Routes, Route } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import BusinessIcon from '@mui/icons-material/Business';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const menuItems = [
    { text: 'Tổng quan', icon: <DashboardIcon />, path: '/', index: 0 },
    { text: 'Về công ty', icon: <BusinessIcon />, path: '/my-company', index: 1 },
    { text: 'Tin tuyển dụng', icon: <WorkIcon />, path: '/my-recruiments', index: 2 },
    { text: 'Quản lý ứng viên', icon: <PeopleIcon />, path: '/my-candidates', index: 3 },
    { text: 'Thống kê', icon: <BarChartIcon />, path: '/statistics', index: 4 },
    { text: 'Lịch sử ', icon: <HistoryIcon />, path: '/my-history', index: 5 },
    { text: 'Hỗ trợ', icon: <HelpOutlineIcon />, path: '/support', index: 6 },
];

const EmployerSidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(null); 
    const location = useLocation();
    const path = location.pathname;
    useEffect(() => {

        const index = menuItems.find((item) => item.path === path)?.index;
        if (!index) return
        setSelectedIndex(index);
        console.log(index);
    }, [path]);
    
    return (
        <Drawer
            variant="permanent"
            sx={{
                flexShrink: 0,
                position: 'fixed',
                '& .MuiDrawer-paper': { width: 260, boxSizing: 'border-box', top: '64px', zIndex: 10 },
            }}
        >
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                    Nhà tuyển dụng
                </Typography>
            </Box>
            <List>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={item.text}
                        selected={index === selectedIndex}
                        onClick={() => setSelectedIndex(index)}
                        component={Link}
                        to={item.path}
                        sx={{
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.main',
                                },
                            },
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default EmployerSidebar;
