import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box, Typography, CssBaseline } from '@mui/material';
import UserNavbar from '~/UserDashBoard/Components/UserNavbar/UserNavbar';
import EmployerNavbar from '~/EmployerDashBoard/Components/EmployerNavbar/EmployerNavbar';

import UserFooter from '~/UserDashBoard/Components/UserFooter/UserFooter';
import EmployerFooter from '~/EmployerDashBoard/Components/EmployerFooter/EmployerFooter';

import { UserDashBoardRoutes, EmployerDashBoardRoutes } from '~/routes';
import Sidebar from '~/UserDashBoard/Components/Sidebar/Sidebar';
import EmployerSidebar from './EmployerDashBoard/Components/EmployerSidebar';
function MyApp() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/auth-page' || location.pathname === '/user/view-cv';
    const role = localStorage.getItem('role');
    const Navbar = role == 2 ? EmployerNavbar : UserNavbar;
    const Footer = role == 2 ? EmployerFooter : UserFooter;
    const DashBoardRoute = role == 2 ? EmployerDashBoardRoutes : UserDashBoardRoutes;
    const WhichSidebar = role == 2 ? EmployerSidebar : Sidebar;
    // console.log(!location.pathname.startsWith('/settings') || role == 2);
    const isViewCVPage = location.pathname.startsWith('/user/view-cv/');
    const isHiddenSidebar = (!location.pathname.startsWith('/settings') && role != 2) || isViewCVPage;
    return (
        <Box sx={{ minHeight: '100vh' }}>
            {/* Hiển thị AppBar nếu không phải trang login */}
            {!isViewCVPage && <Navbar position="sticky" />}
            {/* Các route */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <div>{!isHiddenSidebar && <WhichSidebar />}</div>
                <div className={!isHiddenSidebar ? 'setting-page' : 'page'}>
                    <Routes>
                        {/* Route Nguoi Lao Dong ... */}
                        {DashBoardRoute.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </div>
            </Box>

            {/* Footer */}
            {!isViewCVPage && <Footer position="fixed" />}
        </Box>
    );
}

export default MyApp;
