import { Box, Typography } from '@mui/material';

export default function AboutUs( {company}) {
    return (
        <Box
            sx={{
                background: "white",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
                maxWidth: 900,
                width: "100%",
            }}
        >

            <Typography variant="h6" align="left" gutterBottom sx={{ color: 'black' }}>
                About Us
            </Typography>
            <Typography variant="body1" sx={{ color: 'black' }}>
                {company.description} &
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
            </Typography>
        </Box>
    );
}
