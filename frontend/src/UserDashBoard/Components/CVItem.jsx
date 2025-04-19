import React from 'react';
import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const CVItem = ({ fileName, isMostRecent, uploadedAt, onView }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border={1}
            borderColor="error.main"
            borderRadius={2}
            px={2}
            py={1}
            bgcolor="#fff5f5"
        >
            <Box display="flex" alignItems="center" gap={1.5}>
                <FiberManualRecordIcon sx={{ color: 'error.main', fontSize: 12 }} />
                <Typography variant="body1" fontWeight={500}>
                    {fileName}
                </Typography>
                {/* {isMostRecent && (
                    <Chip
                        label="Most recently applied CV"
                        size="small"
                        sx={{
                            bgcolor: 'primary.light',
                            color: 'primary.main',
                            fontSize: 12,
                            height: 22,
                            ml: 1,
                        }}
                    />
                )} */}
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2" color="text.secondary">
                    Upload from computer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {uploadedAt}
                </Typography>
                <Tooltip title="Xem CV">
                    <IconButton onClick={onView}>
                        <RemoveRedEyeIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default CVItem;
