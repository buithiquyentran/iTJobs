import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";

const Job = () => {
  return (
    <Card
      sx={{ boxShadow: 3, borderRadius: 2, maxHeight: "260px", width: "100%" }}
    >
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" mb={2}>
          {/* Logo */}
          <Box
            component="img"
            src="https://salt.topdev.vn/kuC0LTMMJGOjlgSGZXLZa1JMjJDxK6R_63CNk0G9Ztg/fit/384/1000/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL2ltYWdlcy8yMDI0LzEwLzE4L1RvcERldi1Mb2dvLUZESS1UUk9OLTAxLS0tdGh1b25nLWxlLTE3MjkyNDU0MTQucG5n"
            alt="Company Logo"
            sx={{ width: 180, borderRadius: 1, mr: 2 }}
          />
          {/* Job Title & Company Name */}
          <Box flexGrow={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="bold">
                QC (Automation)
              </Typography>
              <Button variant="outlined" size="small">
                Lưu
              </Button>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              GEM MULTIMEDIA SDN. BHD
            </Typography>
            {/* Salary and Level */}
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <Typography color="error">Thương lượng</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography color="text.secondary">Middle, Senior</Typography>
            </Stack>
            {/* Location */}
            <Typography color="text.secondary" variant="body2" mb={2}>
              Oversea (Oversea)
            </Typography>
            <Divider orientation="hertical" flexItem />
            {/* Tags */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{
                // maxWidth: "100%",
                maxWidth: "503px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginTop: "calc(2* var(--mui-spacing))",
                marginBottom: "12px"
              }}
            >
              {[
                "QA",
                "Tester",
                "Automation Tester",
                "Automation Developer",
              ].map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  clickable
                  color="primary"
                  size="small"
                  sx={{
                    borderRadius: "4px",
                    padding: "4px",
                    fontSize: "16px",
                    height: "unset"
                  }}
                />
              ))}
            </Box>

            <Typography color="text.secondary" variant="body2">
              Đăng 6 giờ trước
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Job;
