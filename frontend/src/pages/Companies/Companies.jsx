import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import "./Companies.css";
import Company from "~/Components/Company/Company";
function Companies() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "50vh",
        margin: "24px",
      }}
    >
      <Typography variant="h6" fontWeight="bold" marginBottom={1}>
        168 Công Ty IT
      </Typography>
      <Grid container spacing={1}>
        <Grid size={3}>
          <Company />
        </Grid>
        <Grid size={3}>
          <Company />
        </Grid>
        <Grid size={3}>
          <Company />
        </Grid>
        <Grid size={3}>
          <Company />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Companies;
