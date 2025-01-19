import React, { useState } from "react";

import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Tabs,
  Tab,
} from "@mui/material";
import LoginForm from "~/Components/LoginForm";
import RegisterForm from "~/Components/RegisterForm";

const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0); // 0: Đăng nhập, 1: Đăng ký

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      // width="670px"
    >
      <Grid item width="784px">
        <Paper elevation={3} sx={{ padding: 4, position: "relative" }}>
          {/* Tabs for Login and Register */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Đăng nhập" />

            <Tab label="Đăng ký" />
          </Tabs>

          {/* Form */}
          
          {tabValue === 0 ? (
            <LoginForm switchToRegister={() => setTabValue(1)} />
          ) : (
            <RegisterForm switchToLogin={() => setTabValue(0)} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
