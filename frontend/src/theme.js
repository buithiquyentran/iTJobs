import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#005D73",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#C5CCC9",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          "&:hover": {
            backgroundColor: "#19857b",
          },
          fontWeight: "600",
        },
      },
    },
  },
  typography: {
    button: {
      fontWeight: 600, // Áp dụng font-weight: 600 cho tất cả các nút
    },
    fontSize: 16, // Kích thước font mặc định là 16px
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});

export default theme;
