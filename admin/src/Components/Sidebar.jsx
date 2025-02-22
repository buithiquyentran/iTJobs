import { useState } from "react";
import { List, ListItemText, Box, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";

const menuItems = [
  { text: "Nhà Tuyển Dụng", icon: <BusinessIcon />, path: "/" },
  { text: "Tin Tuyển Dụng", icon: <WorkIcon />, path: "/recruitment-news" },
  {
    text: "Người Lao Động",
    icon: <PeopleIcon />,
    path: "/employees",
  },
  { text: "Các Danh Mục", icon: <CategoryIcon />, path: "/categories" },
  { text: "Thống Kê", icon: <BarChartIcon />, path: "/statistic" },
];

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Box
      sx={{
        boxShadow:
          "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        backgroundColor: "#fff",
        marginRight: 1,
        marginTop: 1,
        width: "300px",
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
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.main",
                },
              },
            }}
          >
            {item.icon}
            <ListItemText primary={item.text} sx={{ marginLeft: 1 }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
