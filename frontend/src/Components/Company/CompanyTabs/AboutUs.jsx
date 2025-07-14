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

            <Typography variant="h5" align="left" gutterBottom sx={{ color: 'black', fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>
                About Us
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', opacity: 0.7 ,fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>
                {company.description}
            </Typography>
        </Box>
    );
}
