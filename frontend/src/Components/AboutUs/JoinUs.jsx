import { Typography, Divider, Box } from '@mui/material';

export default function JoinUs() {
    return (
        <>
            <Divider sx={{ my: 4 }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    px: 2,
                }}
            >
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{fontFamily: "Barlow, sans-serif"}}>
                    Join Us on the Journey
                </Typography>
                <Typography variant="body1" paragraph sx={{fontFamily: "Barlow, sans-serif"}}>
                    Whether you're starting your career, looking to grow, or building your dream team — <strong>JobHub</strong> is here to support your goals with integrity, innovation, and insight.
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{fontFamily: "Barlow, sans-serif"}}>
                    We’re not just matching resumes to roles. We’re connecting <em>people to purpose</em>.
                </Typography>
            </Box>
        </>
    );
}
