import React, { useState } from 'react';
import { Drawer, List, ListItemText, Box, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';

const menuItems = [
    { text: 'Tài khoản', path: '/account' },
    { text: 'Quản lí CV', path: '/manage-cv' },
    { text: 'Việc đã ứng tuyển', path: '/applied-jobs' },
    { text: 'Việc đã lưu', path: '/saved-jobs' },
    { text: 'Công ty theo dõi', path: '/following-companies' },
];
  
const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <Box
            sx={{
                boxShadow:
                    '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
                backgroundColor: '#fff',
                marginRight: 2,
                marginTop: 1,
            }}
        >
            <List sx={{ padding: 0 }}>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        button
                        key={item.text} 
                        component={Link} 
                        to={item.path} 
                        selected={selectedIndex === index}
                        onClick={() => {
                            console.log(index);
                            setSelectedIndex(index);
                        }} 
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
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
