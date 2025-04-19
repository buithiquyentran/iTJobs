import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Menu, MenuItem, Typography, ListItemText, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import moment from 'moment';
import thongBaoService from '../services/thongBao.service';
import authService from '../services/auth.service';
const NotificationDropdown = ({ userId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unseenCount, setUnseenCount] = useState();

    const open = Boolean(anchorEl);

    // Lấy thông báo từ API (demo gọi giả lập)
    useEffect(() => {
        const fetchNotifications = async () => {
            const user = await authService.getUserInfo();
            const res = await thongBaoService.getByUsername(user.SDT);
            setNotifications(res);
            setUnseenCount(res.filter((n) => n.DA_XEM == 0).length);
        };
        fetchNotifications();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // Đánh dấu tất cả là đã xem
        setNotifications((prev) => prev.map((n) => ({ ...n, DA_XEM: 1 })));
        const updateTB = notifications.map((n) => ({ ...n, DA_XEM: 1 }));
        console.log(updateTB);
        // gọi API đánh dấu đã xem tất cả
        updateTB.map((item) => {
            const res = thongBaoService.update(item.MA_TB, item);
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick} color="inherit">
                <Badge badgeContent={unseenCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ sx: { width: 300 } }}>
                <Typography variant="h6" sx={{ px: 2, pt: 1 }}>
                    Thông báo
                </Typography>
                <Divider />
                {notifications.length === 0 ? (
                    <MenuItem disabled>Không có thông báo nào</MenuItem>
                ) : (
                    notifications.map((n) => (
                        <MenuItem key={n.MA_TB} sx={{ whiteSpace: 'normal' }}>
                            <ListItemText
                                primary={n.NOI_DUNG}
                                secondary={moment(n.NGAY).fromNow()} // hiển thị "1 giờ trước"
                            />
                        </MenuItem>
                    ))
                )}
            </Menu>
        </>
    );
};

export default NotificationDropdown;
