import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto', // Canh giữa
    transition: 'box-shadow 0.3s ease',
    '&:focus-within': {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.12)',
        border: '2px solid #005D73', // Viền tùy chỉnh khi focus
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // Padding khi có biểu tượng
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

function FilterDropdown({ label, options, value, name, onChange }) {
    return (
        <FormControl variant="outlined" style={{ minWidth: '256px' }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                label={label}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

// ✅ Style cho Dropdown
export const CustomFilterDropdown = styled(FilterDropdown)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    borderRadius: '8px',
    padding: '8px 16px',
    minWidth: '236px',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));
// export const CustomFilterDropdown = styled(FilterDropdown)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.light, // Tùy chỉnh màu nền
//   color: theme.palette.text.primary, // Tùy chỉnh màu chữ
//   borderRadius: "8px", // Bo góc
//   padding: "8px 16px",
//   minWidth:"236px",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.main, // Màu khi hover
//     color: theme.palette.primary.contrastText,
//   },
// }));
