import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// #005D73 (Chính)
// #00735D (Tương tự)
// #F2F2F2 (Nền)
const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#005D73',
        },
        secondary: {
            // main: #19857b",
            main: '#00735D',
        },
        error: {
            main: red.A400,
        },
        background: {
            // default: "#eaf1ef",
            default: '#F2F2F2',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    '&:hover': {
                        backgroundColor: '#19857b',
                    },
                    fontWeight: '600',
                    fontSize: 18,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#19857b',
                    },
                    fontWeight: '400',
                    fontSize: 17,
                    borderRadius: '4px',
                    cursor: 'pointer',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        height: 'auto', // Cho phép chiều cao tự động mở rộng
                    },
                },
            },
        },
    },
    typography: {
        button: {
            fontWeight: 600, // Áp dụng font-weight: 600 cho tất cả các nút
        },
        fontSize: 18, // Kích thước font mặc định là 16px
        fontFamily: "'Roboto', 'Arial', sans-serif",
    },
});

export default theme;
