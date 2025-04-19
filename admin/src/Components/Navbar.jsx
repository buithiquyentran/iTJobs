import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";

import ComputerIcon from "@mui/icons-material/Computer";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";



const Navbar = () => {

  
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: 2,
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit" 
          aria-label="open drawer"
          sx={{ marginRight: 2 }}
        >
          <ComputerIcon sx={{ fontSize: "40px", marginRight: "10px" }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block", fontWeight: 800, mx: 3 },
            }}
          >
            Trung Tâm Việc Làm CNTT
          </Typography>
        </IconButton>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          Xin chào, bạn đang đăng nhập với vai trò admin
        </Box>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          // aria-controls={menuId}
          aria-haspopup="true"
          // onClick={handleProfileMenuOpen}
          color="inherit"
          sx={{ marginRight: 1 }}
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
