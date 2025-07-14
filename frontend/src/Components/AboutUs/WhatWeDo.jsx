import { Typography, Box, Divider, Paper, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function WhatWeDo() {
    const jobSeekerItems = [
        {
            title: 'Smart Job Discovery',
            description: 'Filter and search based on skills, seniority, job type, and location.',
        },
        {
            title: 'Company Transparency',
            description: 'Explore company pages with public reviews, culture insights, and employer ratings.',
        },
        {
            title: 'Informed Decisions',
            description: 'Access detailed role descriptions, tech stacks, and expectations.',
        },
        {
            title: 'Skill Tagging',
            description: 'Identify opportunities that match your strengths through clear, consistent tags.',
        },
    ];

    const employerItems = [
        {
            title: 'Compelling Company Profiles',
            description: 'Showcase your culture, values, and work environment.',
        },
        {
            title: 'Authentic Branding',
            description: 'Build trust with candidates through open employee reviews.',
        },
        {
            title: 'Targeted Reach',
            description: 'Connect with talent that aligns with your company vision and goals.',
        },
        {
            title: 'Efficient Management',
            description: 'Use intuitive tools to manage listings and track analytics.',
        },
    ];

    const boxStyle = {
        p: 3,
        borderRadius: 3,
        backgroundColor: '#fdfdfd',
        boxShadow: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 1.5,
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{fontFamily: "Barlow, sans-serif"}}>
                What We Do
            </Typography>

            <Typography variant="body1" paragraph sx={{fontFamily: "Barlow, sans-serif"}}>
                <strong>JobHub</strong> is a modern job platform built to meet the demands of today's workforce. Whether you're actively searching for a new opportunity or trying to build a team that aligns with your culture and goals, we provide tools that make that process easier, smarter, and more transparent.
            </Typography>

            <Box sx={{ mt: 5 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{paddingBottom: 3, fontFamily: "Barlow, sans-serif"}}>
                    For Job Seekers
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {jobSeekerItems.map((item, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Paper sx={boxStyle} elevation={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CheckCircleOutlineIcon color="primary" fontSize="large" />
                                </Box>
                                <Typography variant="subtitle1" fontWeight={600} sx={{ textAlign: 'center', fontFamily: "Barlow, sans-serif" }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontFamily: "Barlow, sans-serif", fontWeight: 500 }}>
                                    {item.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ mt: 6 , pb: 2}}>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{paddingBottom: 3, fontFamily: "Barlow, sans-serif"}}>
                    For Employers
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {employerItems.map((item, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Paper sx={boxStyle} elevation={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CheckCircleOutlineIcon color="primary" fontSize="large" />
                                </Box>
                                <Typography variant="subtitle1" fontWeight={600} sx={{ textAlign: 'center', fontFamily: "Barlow, sans-serif" }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontFamily: "Barlow, sans-serif", fontWeight: 500 }}>
                                    {item.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
