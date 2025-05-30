import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  { text: "Đăng Xuất", icon: <BarChartIcon /> },
];
import AuthService from "~/services/auth.service";

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const confirm = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
      if (confirm) {
        const response = await AuthService.Logout();
        localStorage.removeItem("role");
        // navigate("/auth-page", { replace: true });
        window.location.href = "http://localhost:5173/auth-page";
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Không thể đăng xuất");
    }
  };
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
            color="error"
            onClick={
              item.path
                ? () => {
                    console.log(index);
                    setSelectedIndex(index);
                  }
                : handleLogout
            }
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
