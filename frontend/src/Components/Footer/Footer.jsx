import { Box, Container, Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        padding: "32px 0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">ITJOBS</Typography>
            <Typography variant="body2">
              Connecting talent with opportunity.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">Email: support@itjobs.com</Typography>
            <Typography variant="body2">Phone: +123 456 7890</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Follow Us</Typography>
            <Typography variant="body2">
              Facebook | Twitter | LinkedIn
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
