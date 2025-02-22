import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box, Typography, CssBaseline } from '@mui/material';

import PrimarySearchAppBar from '~/Components/PrimarySearchAppBar/PrimarySearchAppBar';
import Footer from '~/Components/Footer/Footer';
import { publicRoutes } from '~/routes';
import Sidebar from '~/Components/Sidebar/Sidebar';
function MyApp() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/auth-page' || location.pathname === '/user/view-cv';
    const isHiddenSidebar =
        location.pathname === '/' ||
        location.pathname === '/auth-page' ||
        location.pathname === '/company' ||
        location.pathname === '/blog' ||
        location.pathname === '/user/view-cv' ||
        /^\/job\/\d+$/.test(location.pathname) || // Kiểm tra URL dạng /job/1, /job/2, v.v.
        /^\/company\/\d+$/.test(location.pathname); // Kiểm tra URL dạng /company/1, /company/2, v.v.
    return (
        <Box sx={{ minHeight: '100vh' }}>
            {/* Hiển thị AppBar nếu không phải trang login */}
            {!isLoginPage && <PrimarySearchAppBar position="sticky" />}
            {/* Các route */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <div>{!isHiddenSidebar && <Sidebar />}</div>
                <div className={!isHiddenSidebar ? 'setting-page' : 'page'}>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </div>
            </Box>

            {/* Footer */}
            {!isLoginPage && <Footer position="fixed" />}
        </Box>
    );
}

export default MyApp;
