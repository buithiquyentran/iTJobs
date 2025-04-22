import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import ComputerIcon from '@mui/icons-material/Computer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import './UserNavbar.css';
import NotificationDropdown from '../NotificationDropdown';
import AuthService from '~/UserDashBoard/services/auth.service';
const pages = [
    ['Việc Làm IT', '/jobs'],
    ['Công Ty IT', '/company'],
    ['Blog IT', 'blog'],
];
const settings = [
    { name: 'Tài khoản', path: '/settings/account' },
    { name: 'Quản lí CV', path: '/settings/manage-cv' },
    { name: 'Việc đã ứng tuyển', path: '/settings/applied-jobs' },
    { name: 'Việc đã lưu', path: '/settings/saved-jobs' },
    { name: 'Công ty theo dõi', path: '/settings/following-companies' },
    { name: 'Đăng xuất' },
];
const role = localStorage.getItem('role');

export default function UserNavbar() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthService.getUserInfo();
                setUser(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleLogout = async () => {
        try {
            const response = await AuthService.Logout();
            if (response) {
                localStorage.removeItem('role');
                navigate('/auth-page', { replace: true });
            }
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    };
    const handleLogin = () => {
        navigate('/auth-page');
    };
    const handleRegister = () => {
        navigate('/auth-page');
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {settings.map((setting, index) => (
                <MenuItem
                    key={index}
                    component={Link}
                    to={setting.path}
                    color={!setting.path ? 'error' : 'inherit'}
                    onClick={setting.path ? handleMenuClose : handleLogout}
                >
                    {setting.name}
                </MenuItem>
            ))}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ marginRight: 2 }}
                    >
                        <ComputerIcon sx={{ fontSize: '40px', marginRight: '10px' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'block',
                                    fontWeight: 800,
                                    mx: 3,
                                    textDecoration: 'none',
                                    color: '#fff',
                                },
                            }}
                        >
                            Trung Tâm Việc Làm CNTT
                        </Typography>
                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page[1]} className="navbar-link">
                                <Button
                                    key={page[1]}
                                    variant="h6"
                                    component="div"
                                    // onClick={handleCloseNavMenu}
                                    sx={{
                                        color: 'white',
                                        display: 'block',
                                        '&:hover': {
                                            backgroundColor: 'secondary.main', // Màu nền khi hover
                                        },
                                        fontSize: '18px',
                                    }}
                                >
                                    {page[0]}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {/* Đăng nhập rồi */}
                    {user?.TEN_NLD ? (
                        <>
                            <Box sx={{ flexGrow: 1, alignItems: 'center' }}>Xin chào {user.TEN_NLD}</Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            md: 'flex',
                                        },
                                    }}
                                >
                                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                        <Badge badgeContent={4} color="error">
                                            <MailIcon />
                                        </Badge>
                                    </IconButton>
                                    {/* Thông báo */}
                                    {/* <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                                        <Badge badgeContent={17} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton> */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                                        <NotificationDropdown userId={'NTV001'} />
                                    </div>
                                    {/* Account */}
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                        sx={{ marginLeft: 2 }}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex' }}>
                            <Typography
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    width: '140px',
                                    fontWeight: 'bold',
                                    marginRight: 1,
                                    padding: '6px 16px',
                                    textAlign: 'center',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        cursor: 'pointer',
                                    },
                                    fontSize: '18px',
                                }}
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </Typography>
                            <Typography
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    width: '140px',
                                    fontWeight: 'bold',
                                    marginRight: 1,
                                    padding: '6px 16px',
                                    textAlign: 'center',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        cursor: 'pointer',
                                    },
                                    fontSize: '18px',
                                }}
                                onClick={handleRegister}
                            >
                                Đăng ký
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
