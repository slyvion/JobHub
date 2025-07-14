import { Typography, Box } from '@mui/material';

export default function AboutIntro() {
    return (
        <Box sx={{ textAlign: 'center', paddingTop: 3}}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{fontFamily: "Barlow, sans-serif"}}>
                About Us
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph sx={{fontFamily: "Barlow, sans-serif"}}>
                Empowering the Future of Hiring
            </Typography>
            <Typography variant="body1" paragraph sx={{fontFamily: "Barlow, sans-serif"}}>
                At <strong>JobHub</strong>, we are committed to redefining how talent connects with opportunity. In a world where the job market evolves rapidly, our mission is to bring <strong>transparency, trust, and efficiency</strong> to the hiring process — for both job seekers and employers.
            </Typography>
            <Typography variant="body1" paragraph sx={{fontFamily: "Barlow, sans-serif"}}>
                We believe that a job is more than just a title, and a company is more than just a logo. Behind every application is a story, and behind every job post is a vision. JobHub exists to bring those stories and visions together in meaningful, data-driven, and human-centered ways.
            </Typography>
        </Box>
    );
}
