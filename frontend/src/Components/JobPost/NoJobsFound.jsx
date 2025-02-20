import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function NoJobsFound() {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#80bfff"
            p={2}
            borderRadius={3}
        >
            <InfoIcon />
            <Typography variant="body1" ml={1}>
                No job posts found with such criteria
            </Typography>
        </Box>
    );
}
